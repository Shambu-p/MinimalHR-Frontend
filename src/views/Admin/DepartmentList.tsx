import React, {useContext, useEffect, useState} from "react";
import DepartmentModel from "../../Models/DepartmentModel";
import {Request} from "../../API.Interaction/api";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";
import {useNavigate} from "react-router-dom";

export default function () {

    const {setAlert, setWaiting} = useContext(AlertContext);
    // const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie, cookies} = useContext(AuthContext);

    const navigate = useNavigate();
    const [departments, setDepartment] = useState<DepartmentModel[]>([]);
    
    useEffect(() => {

        let loadDepartments = async () => {
            
            try{
                setDepartment(await Request("get", "/Department/all"));
            } catch({message}){
                setAlert(message, "danger");
            }
            
        };
        
        loadDepartments();

    }, []);
    
    return (
        <div className="container">
            {departments.map(department => (
                <div className="card-body bg-white rounded shadow-sm mb-3">
                    <h4 className="card-title">{department.name}</h4>
                    <button className="icon_button rounded mr-3" type="button" onClick={() => {navigate("/admin/department_view/"+department.id)}}>
                        <i className="bi bi-eye-fill text-primary" /> View
                    </button>
                </div>
            ))}
        </div>
    );
};