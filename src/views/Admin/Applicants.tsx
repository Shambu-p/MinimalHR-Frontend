import MyButton from "../../components/Extra/MyButton";
import TableDisplay from "../../components/Extra/TableDisplay";
import React, {useContext, useEffect, useState} from "react";
import {Request} from "../../API.Interaction/api";
import {useNavigate, useParams} from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";
import AlertContext from "../../Contexts/AlertContext";
import DepartmentAPI from "../../API.Interaction/DepartmentAPI";
import VacancyAPI from "../../API.Interaction/VacancyAPI";
import UserAPI from "../../API.Interaction/UserAPI";
import EmployeeModel from "../../Models/EmployeeModel";

export default function (){

    const {isLoggedIn, loggedUser, authWaiting} = useContext(AuthContext);
    const {setAlert, setWaiting} = useContext(AlertContext);

    const [applicants, setApplicants] = useState<EmployeeModel[]>([]);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let loadApplicants = async () => {
            try{

                let resp = await VacancyAPI.vacancyDetail(parseInt(params.vacancy_id ?? "0"));
                let response = await UserAPI.vacancyApplicant(loggedUser.token, resp.detail.salary, resp.detail.position, resp.detail.department_id);
                setApplicants(response);

            } catch ({message}){
                setAlert(message, "danger");
            }
        };

        if(loggedUser){
            loadApplicants();
        }else{
            console.log(loggedUser);
        }

    }, [loggedUser])

    let row = applicants.map(applicant => {
        return [
            applicant.full_name,
            applicant.phone_number,
            applicant.email,
            applicant.education_level,
            applicant.status,
            (<button className="icon_button rounded" type="button" onClick={() => {navigate("/admin/view_application/"+applicant.application_number)}}>
                <i className="bi bi-eye-fill text-primary" /> View
            </button>)
        ];
    });

    return (
        <div className="bg-white rounded p-3 shadow-sm">
            <TableDisplay
                columns={["Full Name", "Phone Number", "Email Address", "Education Level", "Status", "Actions"]}
                rows={row}
            />
        </div>
    );
}