import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {loginAuth, Login} from "../API.Interaction/AuthAPI";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline, Box, Avatar, Button, Typography, TextField } from "@mui/material";
import Users from "../Models/Users";
import MainAppbar from "../components/AppBars/Main";
import MyInput from "../components/Extra/MyInput";
import MyButton from "../components/Extra/MyButton";

export default function (){

    const [inputs, setInputs] = useState({
        application_number: "",
    });
    const [logged_user, setLog] = useState<Users | null>(null);
    const [is_logged_in, setLogState] = useState<boolean>(false);
    const navigate = useNavigate();


    let usernameOnChange = (event: any) => {
        setInputs({
            application_number: event.target.value
        });
    };

    let submitForm = async (event: any) => {
        event.preventDefault();
        try {

            // let response = await Login(inputs.email, inputs.password);
            // setLog(response);
            setLogState(true);

            navigate("/exam/show");

        }catch ({message}){
            alert(message);
        }
    }

    const theme = createTheme();

    return (
        <div className="container">
            <MainAppbar page="home" />
            <div className="d-flex justify-content-center">
                <form className="login-form-container pt-3 pb-3 mt-4">
                    <div className="mb-3 d-flex justify-content-center">
                        <i className="bi bi-person-badge-fill login-form-icon" />
                    </div>

                    <MyInput icon="bi bi-hash" type="number" placeholder="Application Number" />

                    <div className="mt-4 d-flex justify-content-end">
                        <MyButton icon="bi bi-person-check-fill" text="Check" color="main" />
                    </div>

                </form>
            </div>
        </div>
    );
}