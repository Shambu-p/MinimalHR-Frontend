import MyButton from "../../components/Extra/MyButton";
import TableDisplay from "../../components/Extra/TableDisplay";
import React, {useContext, useEffect, useState} from "react";
import {Request} from "../../API.Interaction/api";
import {useNavigate, useParams} from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";
import AlertContext from "../../Contexts/AlertContext";

export default function (){

    const {isLoggedIn, loggedUser, authWaiting} = useContext(AuthContext);
    const {setAlert, setWaiting} = useContext(AlertContext);

    const [applicants, setApplicants] = useState<any[]>([]);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let loadApplicants = async () => {
            try{

                let resp = await Request("get", "/Vacancy/vacancy_detail/"+params.vacancy_id);
                console.log(resp);
                let response = await Request("post", "/Employees/application_list", {
                    token: loggedUser.token,
                    salary: resp.detail.salary,
                    position: resp.detail.position,
                    department_id: resp.detail.department_id
                });
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
            (
                <button className="icon_button rounded" type="button" onClick={() => {navigate("/admin/view_application/"+applicant.application_number)}}>
                    <i className="bi bi-eye-fill text-primary" /> View
                </button>
            )
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