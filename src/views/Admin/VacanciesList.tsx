import MyButton from "../../components/Extra/MyButton";
import TableDisplay from "../../components/Extra/TableDisplay";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import VacancyCard from "../../components/Vacancy/VacancyCard";
import {Request} from "../../API.Interaction/api";

export default function (){

    const navigate = useNavigate();

    const [vacancies, setVacancies] = useState<any[]>([]);

    useEffect(() => {

        let loadVacancies = async () => {
            let response = await Request("post", "/Vacancy/all", {status: ""});
            setVacancies(response);
            console.log(response);
        };

        loadVacancies();

    }, []);

    let vacancy_objects = vacancies.map(vacancy => {
        return (
            <VacancyCard
                key={vacancy.id}
                position={vacancy.position}
                department={vacancy.department_id}
                description={vacancy.description}
                salary={vacancy.salary}
            />
        );
    });

    return (
        <div>
            <div className="rounded shadow-sm p-3 mb-3 bg-white">

                <div className="d-flex justify-content-end">
                    <MyButton icon="bi bi-plus" text="Vacancy" onClick={() => {navigate("/admin/create_vacancy")}} />
                </div>

            </div>
            {vacancy_objects}
        </div>

    );
}