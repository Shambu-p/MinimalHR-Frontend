import React, {useContext, useEffect, useState} from "react";
import DepartmentModel from "../../Models/DepartmentModel";
import {Request} from "../../API.Interaction/api";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import MyButton from "../../components/Extra/MyButton";
import TableDisplay from "../../components/Extra/TableDisplay";
import DepartmentAPI from "../../API.Interaction/DepartmentAPI";

export default function () {

    const {setAlert, setWaiting} = useContext(AlertContext);

    const navigate = useNavigate();
    const [departments, setDepartment] = useState<DepartmentModel[]>([]);
    
    useEffect(() => {

        let loadDepartments = async () => {
            
            try{
                setDepartment(await DepartmentAPI.getAll());
            } catch({message}){
                setAlert(message, "danger");
            }
            
        };
        
        loadDepartments();

    }, []);

    const row = departments.map(department => ([
        department.name,
        (<button
            className="icon_button rounded mr-3"
            type="button"
            onClick={() => {navigate("/admin/department_view/"+department.id)}}
        >
            <i className="bi bi-eye-fill text-primary" /> View
        </button>)
    ]));
    
    return (
        <div className="container bg-white shadow-sm rounded p-3">
            <div className="d-flex justify-content-end">
                <MyButton text={"New"} icon={"bi bi-plus-square"} onClick={() => {navigate("/admin/create_department");}} />
            </div>
            <TableDisplay
                columns={["Department Name", "Actions"]}
                rows={row}
            />
        </div>
    );
};