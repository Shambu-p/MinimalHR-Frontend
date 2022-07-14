import React, {useContext, useEffect, useState} from "react";
import DepartmentModel from "../../Models/DepartmentModel";
import {Request} from "../../API.Interaction/api";
import AlertContext from "../../Contexts/AlertContext";
import {useNavigate, useParams} from "react-router-dom";
import DepartmentAPI from "../../API.Interaction/DepartmentAPI";

export default function (){

    const {setAlert, setWaiting} = useContext(AlertContext);

    const params = useParams();
    const navigate = useNavigate();
    const [department, setDepartment] = useState<DepartmentModel>();

    useEffect(() => {

        let loadDepartments = async () => {

            try{
                setDepartment(await DepartmentAPI.departmentDetail(parseInt(params.department_id ?? "0")));
            } catch({message}){
                setAlert(message, "danger");
            }

        };

        loadDepartments();

    }, []);

    return (
        <div className="card-body bg-white rounded shadow-sm">

            <h3 className="card-title mb-0">{department?.name}</h3>
            <span className="card-subtitle">{department?.department_head}</span> <br/>

            <div className="d-flex justify-content-end pt-3 border-top mt-5">
                <button className="icon_button rounded mr-3 " type="button" onClick={() => {navigate("/admin/change_department/"+params.department_id);}}>
                    <i className="bi bi-pencil-square text-primary" /> Edit
                </button>
            </div>

        </div>
    );
}