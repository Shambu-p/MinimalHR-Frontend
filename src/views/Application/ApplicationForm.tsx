import React, {useContext, useEffect, useState} from "react";
import MainAppBar from "../../components/AppBars/Main";
import MyButton from "../../components/Extra/MyButton";
import CreateEmployeeForm from "../../components/CreateEmployeeForm";
import {Request} from "../../API.Interaction/api";
import {useNavigate, useParams} from "react-router-dom";
import VacanciesModel from "../../Models/VacanciesModel";
import AlertContext from "../../Contexts/AlertContext";

export default function () {

    const {setAlert, setWaiting} = useContext(AlertContext);

    const params = useParams();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState<any|null>(null);
    const [vacancy, setVacancy] = useState<VacanciesModel|null>(null);

    useEffect(() => {

        let loadVacancy = async () => {

            try{
                let response = await Request("get", "/Vacancy/vacancy_detail/" + params.vacancy_id);
                setVacancy(response);
            }catch({message}){
                setAlert(message, "danger");
            }

        };

        loadVacancy();

    }, []);

    const apply = async (form: {address: any, detail: any}) => {

        try{

            setTimeout(() => {setWaiting(true)}, 1);
            form.detail.salary = vacancy?.salary;
            form.detail.position = vacancy?.position;
            form.detail.department_id = vacancy?.department_id;
            form.detail.vacancy_id = vacancy?.id;

            let response = await Request("post", "/Employees/apply_for_vacancy", {
                ...form.detail,
                address: JSON.stringify(form.address)
            });

            setSubmitted(response.employee);
            setWaiting(false);
            setAlert("account created successfully", "success");

        } catch({message}) {
            setAlert(message, "danger");
            setWaiting(false);
        }

    };

    const viewApplication = () => {

    };

    return (
        <div className="container">

            <MainAppBar />

            <div className="d-flex">
                {(submitted != null) ? (
                    <div className="w-75 p-3 rounded shadow-sm bg-white" style={{margin: "auto"}}>

                        <div className="d-flex">
                            <i className="bi bi-check2-circle mr-3 text-success" style={{fontSize: "6rem"}} />
                            <h5 className="display-4" style={{marginTop: "auto", marginBottom: "auto"}}>Application was Successful!</h5>
                        </div>
                        <p className="lead mb-3">
                            Next time if you want to check your application progress use <b>{submitted.application_number}</b> as an application number
                        </p>

                        <div className="d-flex justify-content-between">
                            <MyButton text="Home" color="main" icon="bi bi-house" />
                            <MyButton text="View Application" onClick={() => {navigate("/view_application/" + submitted.application_number)}} color="main" icon="bi bi-check2-square" />
                        </div>

                    </div>
                ) : (
                    <CreateEmployeeForm department_input={false} createOnSubmit={apply} />
                )}
            </div>

        </div>
    );

}