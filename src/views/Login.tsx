import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {Login} from "../API.Interaction/AuthAPI";
import MainAppbar from "../components/AppBars/Main";
import MyInput from "../components/Extra/MyInput";
import MyButton from "../components/Extra/MyButton";
import AlertContext from "../Contexts/AlertContext";
import AuthContext from "../Contexts/AuthContext";

export default function (){

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie} = useContext(AuthContext);

    const [inputs, setInputs] = useState<{email: string, password: string}>({email: "", password: ""});

    const navigate = useNavigate();

    useEffect(() => {

        const checkLogin = () => {
            if(isLoggedIn) {
                navigate("/admin/home");
            }
        };

        checkLogin();

    }, [isLoggedIn]);


    let inputOnChange = (input_name: "email"|"password", value: string|any) => {
        let inp: { email: string, password: string } = {...inputs};
        inp[input_name] = value;
        setInputs(inp);
    };

    let submitForm = async (event: any) => {
        event.preventDefault();
        setTimeout(() => {setWaiting(true)}, 1);
        try {

            let response = await Login(inputs.email, inputs.password);
            
            setCookie("login_token", response.token);
            setLoggedUser(response);
            setLoggedIn(true);

            setWaiting(false);
            setAlert("login successful", "success", "top-right-alert")

            navigate("/admin/home");

        }catch ({message}){
            setAlert(message, "danger", "top-right-alert")
            setWaiting(false);
        }
    }

    return (
        <div className="container">
            <MainAppbar />
            <div className="d-flex justify-content-center">
                <form onSubmit={submitForm} className="login-form-container pt-3 pb-3 mt-4">
                    <div className="mb-3 d-flex justify-content-center">
                        <i className="bi bi-person-badge-fill login-form-icon" />
                    </div>

                    <div className="input-group mb-3">
                        <MyInput value={inputs.email} onChange={(event: any) => {inputOnChange("email", event.target.value);}} icon="bi bi-envelope" type="text" placeholder="Email Address" />
                    </div>
                    <div className="input-group mb-5">
                        <MyInput value={inputs.password} onChange={(event: any) => {inputOnChange("password", event.target.value);}} icon="bi bi-key" type="password" placeholder="Password" />
                    </div>

                    <div className="d-flex justify-content-between">
                        <MyButton text="Sign In" type="submit" color="success" icon="bi bi-door-open" />
                        <MyButton text="Forgot Password" color="danger" icon="bi bi-key"  />
                    </div>

                </form>
            </div>
        </div>
    );
}