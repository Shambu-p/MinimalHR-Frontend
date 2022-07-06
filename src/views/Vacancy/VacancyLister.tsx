import React, {useContext, useEffect, useState} from "react";
import AlertContext from "../../Contexts/AlertContext";
import DepartmentModel from "../../Models/DepartmentModel";
import {Request} from "../../API.Interaction/api";
import MyInput from "../../components/Extra/MyInput";
import SelectInput from "../../components/Extra/SelectInput";
import VacancyCard from "../../components/Vacancy/VacancyCard";
import MyButton from "../../components/Extra/MyButton";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";
import MainAppbar from "../../components/AppBars/Main";

export default function (){

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, authWaiting} = useContext(AuthContext);

    const navigate = useNavigate();
    const [Inputs, setInputs] = useState<{
        position: string,
        status: "open"|"closed",
        department: {key: any, value: any}|null
    }>({
        position: "",
        status: "open",
        department: null
    });
    const [departments, setDepartments] = useState<DepartmentModel[]>([]);
    const [vacancies, setVacancies] = useState<any[]>([]);

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
                status: Inputs.status
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

        if(departments.length == 0){
            loadDepartment();
        }
        loadVacancies();

    }, [Inputs]);

    const onChangeInput = (field: ("position"|"department"|"status"), value: any) => {
        let inp = {...Inputs};
        inp[field] = value;
        setInputs(inp);
    };

    console.log(loggedUser);
    return authWaiting ? (<></>):(
        <div className={(window.location.pathname == "/") ? "container p-0":""}>
            {(window.location.pathname == "/") ? (<MainAppbar page="home" />) : ""}
            <div className="d-flex justify-content-between home-inputs mb-3">

                {isLoggedIn && loggedUser && loggedUser.is_admin ? (
                    <div className="input-group mb-3 pr-2 pl-2">
                        <SelectInput
                            list={[
                                {key: "open", value: "Open For Applicants"},
                                {key: "closed", value: "Deadline passed or Closed"}
                            ]}
                            placeholder="Select State" icon="bi bi-clipboard2-pulse-fill"
                            onChange={(stat) => {onChangeInput("status", stat.key)}}
                        />
                    </div>
                ):(
                    <div className="input-group mb-3 pr-2 pl-2">
                        <MyInput
                            value={Inputs.position}
                            type="text"
                            placeholder="Search by Position"
                            icon="bi bi-search"
                            onChange={(event) => {onChangeInput("position", event.target.value)}}
                        />
                    </div>
                )}
                <div className="input-group pr-2 pl-2 mb-3">
                    <SelectInput
                        list={departments.map(dept => ({key: dept.id, value: dept.name}))}
                        placeholder="Select Department" icon="bi bi-caret-down"
                        onChange={(dpt) => {onChangeInput("department", dpt)}}
                    />
                </div>
            </div>
            {isLoggedIn && loggedUser && loggedUser.is_admin ? (
                <div className="d-flex justify-content-end mb-3">
                    <MyButton icon="bi bi-plus" text="Vacancy" onClick={() => {navigate("/admin/create_vacancy")}} />
                </div>
            ): ""}
            <div className="p-2">
                {vacancies.map(vacancy => {
                    return (
                        <VacancyCard
                            key={vacancy.id}
                            id={vacancy.id}
                            salary={vacancy.salary}
                            description={vacancy.description}
                            department={vacancy.department_name}
                            position={vacancy.position}
                            is_public={!isLoggedIn && !loggedUser}
                        />
                    );
                })}
            </div>
        </div>
    );
};