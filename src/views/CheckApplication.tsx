import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import MainAppbar from "../components/AppBars/Main";
import MyInput from "../components/Extra/MyInput";
import MyButton from "../components/Extra/MyButton";

export default function (){

    const [inputs, setInputs] = useState({
        application_number: "",
    });
    const navigate = useNavigate();



    const inputOnChange = (event: any) => {
        setInputs({
            application_number: event.target.value
        });
    };

    const submitForm = async (event: any) => {
        event.preventDefault();
        navigate("/view_application/" + inputs.application_number);
    }

    return (
        <div className="container">
            <MainAppbar />
            <div className="d-flex justify-content-center">
                <form onSubmit={submitForm} className="login-form-container pt-3 pb-3 mt-4">
                    <div className="mb-3 d-flex justify-content-center">
                        <i className="bi bi-person-badge-fill login-form-icon" />
                    </div>

                    <MyInput value={inputs.application_number} icon="bi bi-hash" type="number" placeholder="Application Number" onChange={inputOnChange} />

                    <div className="mt-4 d-flex justify-content-end">
                        <MyButton icon="bi bi-person-check-fill" type={"submit"} text="Check" color="main" />
                    </div>

                </form>
            </div>
        </div>
    );
}