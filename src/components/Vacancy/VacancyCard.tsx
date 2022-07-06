import MyButton from "../Extra/MyButton";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function (props: {
    id: number,
    position: string,
    department: number,
    salary: number,
    description: string,
    is_public: boolean
}){

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
                    <MyButton text="Apply" onClick={() => {navigate("/application_form/"+props.id);}} icon="bi bi-check2-square" color="success" />
                    <MyButton text="View" icon="bi bi-eye-fill" onClick={() => {
                        if(props.is_public){
                            navigate("/vacancy_view/"+props.id);
                        }else{
                            navigate("/admin/vacancy_view/"+props.id);
                        }
                    }} />
                </div>

            </div>
        </div>
    );
}