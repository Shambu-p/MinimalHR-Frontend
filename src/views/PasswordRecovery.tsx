import React, {useContext, useState} from "react";
import MainAppbar from "../components/AppBars/Main";
import AlertContext from "../Contexts/AlertContext";
import {Request} from "../API.Interaction/api";
import RecoveryForms from "../components/RecoveryForms";
import {useNavigate} from "react-router-dom";
import UserAPI from "../API.Interaction/UserAPI";

export default function () {

    const {setAlert, setWaiting} = useContext(AlertContext);

    const navigate = useNavigate();
    const [currentForm, setCurrentForm] = useState<"find"|"verify"|"new_password">("find");
    const [user, setUser] = useState<any>();

    const findAccount = async (input_value: any) => {

        setTimeout(() => {setWaiting(true);}, 1);

        try {

            let response: any = await UserAPI.findAccount(input_value);

            setUser(response);
            setCurrentForm("verify");

        } catch({message}) {
            setAlert(message, "danger");
        }

        setWaiting(false);

    };

    const verifyAccount = async (input_value: any) => {

        setTimeout(() => {setWaiting(true);}, 1);

        try{

            let response: any = await UserAPI.verifyUser(user.employee_id, input_value);

            response.verification_code = input_value;
            setUser(response);
            setAlert("account verified!", "success");

        } catch({message}) {
            setAlert(message, "danger");
        }

        setWaiting(false);

    };

    const newPassword = async (new_password: any, confirm_password: any) => {

        setTimeout(() => {setWaiting(true);}, 1);

        try{

            let response: any = UserAPI.recoverPassword(user.employee_id, user.verification_code, new_password, confirm_password);

            setAlert("account verified!", "success");
            navigate("/login");

        } catch({message}) {
            setAlert(message, "danger");
        }
        setWaiting(false);
    }

    const formSubmit = (input_value: any) => {
        if(currentForm == "find"){
            findAccount(input_value);
        }else if(currentForm == "verify"){
            verifyAccount(input_value);
        }else{
            newPassword(input_value.new_password, input_value.confirm_password);
        }
    };

    return (
        <div className="container">
            <MainAppbar />

            <RecoveryForms type={currentForm} onSubmit={formSubmit} />
        </div>
    );

};