import React, {useContext, useEffect, useState} from "react";
import MyButton from "../../components/Extra/MyButton";
import {useNavigate, useParams} from "react-router-dom";
import AlertContext from "../../Contexts/AlertContext";
import {Request} from "../../API.Interaction/api";
import AuthContext from "../../Contexts/AuthContext";
import VacanciesModel from "../../Models/VacanciesModel";
import DepartmentModel from "../../Models/DepartmentModel";
import MainAppbar from "../../components/AppBars/Main";

export default function (){

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, authWaiting, loggedUser} = useContext(AuthContext);

    const navigate = useNavigate();
    const params = useParams();

    const [vacancy, setVacancy] = useState<VacanciesModel|null>(null);
    const [department, setDepartment] = useState<DepartmentModel|null>(null);
    const [updater, setUpdater] = useState<any>(null);

    useEffect(() => {
        let loadVacancy = async () => {
            try{
                setTimeout(() => {setWaiting(true)}, 1);
                let response = await Request("get", "/Vacancy/vacancy_detail/"+params.vacancy_id);
                setUpdater(response.updated_by);
                setDepartment(response.department);
                setVacancy(response.detail);
                setWaiting(false);
            } catch({message}) {
                setAlert(message, "danger");
                setWaiting(false);
            }
        };

        loadVacancy();
    }, []);

    const changeVacancyState = async (state: ("closed"|"open")) => {
        
        try{

            let response = await Request("post", "/Vacancy/update_vacancy", {
                ...vacancy,
                employee_id: loggedUser.employee_id,
                vacancy_id: vacancy?.id,
                status: state
            });

            setAlert("Status Changed successfully!", "main");

        } catch({message}){
            setAlert(message, "danger");
        }
    };
    
    return !authWaiting && vacancy ? (
        <div className={window.location.pathname.startsWith("/vacancy_view") ? "container p-0":""}>
            {window.location.pathname.startsWith("/vacancy_view") ? (<MainAppbar page="home" />) : ""}
            <div className="card-body rounded shadow-sm bg-white">
                <div className="d-flex justify-content-between border-bottom pb-2">
                    <div>
                        <h5 className="card-title">{vacancy.position}</h5>
                        <span className="card-subtitle">{department?.name}</span><br/>
                        <span className="card-subtitle">
                            <strong className="mr-3">Last Updated by</strong>
                            {updater.full_name}
                        </span>
                    </div>
                    <div>
                        <h4><strong className="mr-3">Salary: </strong> {vacancy.salary}ETB</h4>
                    </div>
                </div>
                <div className="d-flex justify-content-end mb-3 pt-3 mb-5 border-bottom" style={{flexWrap: "wrap"}}>
                    {isLoggedIn && loggedUser && loggedUser.is_admin && vacancy.status === "open" ? (
                        <MyButton icon="bi bi-x-square-fill" text="Close" color="danger" onClick={() => {changeVacancyState("closed");}} />):(
                        <MyButton icon="bi bi-heart-fill" text="Apply" color="success" onClick={() => {navigate("/application_form/"+params.vacancy_id)}} />
                    )}
                    {isLoggedIn && loggedUser && loggedUser.is_admin ? (<MyButton icon="bi bi-pencil-square" text="Edit" color="main" onClick={() => {navigate("/admin/edit_vacancy/"+params.vacancy_id)}} />):""}
                    {isLoggedIn && loggedUser && loggedUser.is_admin ? (<MyButton icon="bi bi-person-lines-fill" text="Applicants" color="main" onClick={() => {navigate("/admin/applicant_list/"+params.vacancy_id)}} />):""}
                </div>
                <p className="lead">{vacancy.description}</p>
            </div>
        </div>

    ):<div>loading</div>;

}