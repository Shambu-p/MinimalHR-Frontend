import MyButton from "../Extra/MyButton";
import React, {useContext} from "react";
import AlertContext from "../../Contexts/AlertContext";
import {useNavigate} from "react-router-dom";

export default function (props: {
    position: string,
    department: number,
    salary: number,
    description: string
}){

    const {setAlert} = useContext(AlertContext);
    const navigate = useNavigate();

    return (
        <div className="card shadow-sm mb-3 rounded">
            <div className="card-header vacancy-header d-flex justify-content-between">
                <div>
                    <h5 className="card-title mb-1">{props.position}</h5>
                    <span className="vacancy-department-text">{props.department}</span>
                </div>
                <div className="salary-container">
                    <span className="salary-text">{props.salary}ETB</span>
                </div>
            </div>
            <div className="card-body vacancy-body">
                <p className="lead mb-5">
                    {props.description}
                </p>

                <div className="d-flex justify-content-end" style={{flexWrap: "wrap"}}>
                    <MyButton text="Apply" onClick={() => {navigate("/application_form")}} icon="bi bi-check2-square" color="success" />
                    <MyButton text="View" icon="bi bi-eye-fill" />
                    <MyButton text="Close Application" icon="bi bi-x" color="danger" />
                </div>

            </div>
        </div>
    );
}