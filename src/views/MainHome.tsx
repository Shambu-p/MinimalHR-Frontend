import React, {useContext, useEffect, useState} from "react";
import MainAppbar from '../components/AppBars/Main';
import MyInput from "../components/Extra/MyInput";
import VacancyCard from "../components/Vacancy/VacancyCard";
import SelectInput from "../components/Extra/SelectInput";
import AlertContext from "../Contexts/AlertContext";
import DepartmentModel from "../Models/DepartmentModel";
import {Request} from "../API.Interaction/api";
import VacanciesModel from "../Models/VacanciesModel";

export default function (){

    const {setAlert, setWaiting} = useContext(AlertContext);

    const [Inputs, setInputs] = useState<{
        position: string,
        department: {key: any, value: any}|null
    }>({
        position: "",
        department: null
    });
    const [departments, setDepartments] = useState<DepartmentModel[]>([]);
    const [vacancies, setVacancies] = useState<VacanciesModel[]>([]);

    useEffect(() => {

        let loadDepartment = async () => {
            try{
                setDepartments(await Request("get", "/Department/all"));
            }catch({message}){
                setAlert(message, "danger");
            }
        };

        let loadVacancies = async () => {
            let req_fields: {
                position?: string,
                status?: ("open"|"closed"),
                department_id?: number
            } = {
                position: Inputs.position,
                status: "open"
            };

            if(Inputs.department != null){
                req_fields["department_id"] = Inputs.department.key;
            }

            try{
                setVacancies(await Request("post", "/Vacancy/all", req_fields));
            } catch({message}) {
                setAlert(message, "danger");
            }
        };

        loadDepartment();
        loadVacancies();

    }, [Inputs]);
    
    const onChangeInput = (field: ("position"|"department"), value: any) => {
        let inp = {...Inputs};
        inp[field] = value;
        setInputs(inp);
    };

    return (
        <div className="container p-0">
            <MainAppbar page="home" />
            <div className="d-flex justify-content-between home-inputs mb-3">
                <div className="input-group pr-2 pl-2">
                    <MyInput
                        value={Inputs.position}
                        type="text"
                        placeholder="Search by Position"
                        icon="bi bi-search"
                        onChange={(event) => {onChangeInput("position", event.target.value)}}/>
                </div>
                <div className="input-group pr-2 pl-2">
                    <SelectInput
                        list={departments.map(dept => ({key: dept.id, value: dept.name}))}
                        placeholder="Select Department" icon="bi bi-caret-down"
                        onChange={(dpt) => {onChangeInput("department", dpt)}}
                    />
                </div>
            </div>
            <div className="p-2">
                {vacancies.map(vacancy => {
                    return (
                        <VacancyCard
                            key={vacancy.id}
                            id={vacancy.id}
                            salary={vacancy.salary}
                            description={vacancy.description}
                            department={vacancy.department_id}
                            position={vacancy.position}
                        />
                    );
                })}
            </div>

        </div>
    );
    
}