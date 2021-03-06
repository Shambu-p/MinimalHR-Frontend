import React, {useContext} from 'react';
import CreateEmployeeForm from "../../components/CreateEmployeeForm";
import {Request} from "../../API.Interaction/api";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";
import UserAPI from "../../API.Interaction/UserAPI";

export default function() {

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {cookies} = useContext(AuthContext);

    const onCreateEmployee = async (form: {address: any, detail: any}) => {
        try{

            setTimeout(() => {setWaiting(true)}, 1);
            await UserAPI.newEmployee(cookies.login_token, form.detail, JSON.stringify(form.address));

            setWaiting(false);
            setAlert("account created successfully", "success");

        } catch({message}) {
            setAlert(message, "danger");
            setWaiting(false);
        }
    };

    return (
        <CreateEmployeeForm department_input={true} createOnSubmit={onCreateEmployee} />
    );

}