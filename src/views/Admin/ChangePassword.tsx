import React, {useContext, useState} from "react";
import MyInput from "../../components/Extra/MyInput";
import {Simulate} from "react-dom/test-utils";
import MyButton from "../../components/Extra/MyButton";
import {Request} from "../../API.Interaction/api";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";

interface InputType {
    old_password: string,
    new_password: string,
    confirm_password: string
}

export default function (){

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, authWaiting} = useContext(AuthContext);

    const [Inputs, setInputs] = useState<InputType>({
        old_password: "",
        new_password: "",
        confirm_password: ""
    });

    const inputOnChange = (field: ("old_password"|"new_password"|"confirm_password"), value: any) => {
        let inp: InputType = {...Inputs};
        inp[field] = value;
        setInputs(inp);
    };

    const formSubmit = async (event: any) => {
        event.preventDefault();
        try{

            let response = await Request("post", "/Employees/change_password", {
                token: loggedUser.token,
                ...Inputs
            });

            setAlert("Password Changed Successfully", "success");

        }catch({message}){
            setAlert(message, "danger");
        }

    };
    
    return authWaiting ? (<></>) : (
        <form onSubmit={formSubmit} className="container p-3 rounded bg-white shadow-sm">
            <h4 className="display-4">Change Password</h4>
            
            <div className="input-group mb-3">
                <MyInput value={Inputs.old_password} type="password" placeholder="Old Password" icon="bi bi-key-fill" onChange={(event: any) => {inputOnChange("old_password", event.target.value)}} />
            </div>

            <div className="input-group mb-3">
                <MyInput value={Inputs.new_password} type="password" placeholder="New Password" icon="bi bi-key-fill" onChange={(event: any) => {inputOnChange("new_password", event.target.value)}} />
            </div>

            <div className="input-group mb-5">
                <MyInput value={Inputs.confirm_password} type={"password"} placeholder="New Password" icon="bi bi-key-fill" onChange={(event: any) => {inputOnChange("new_password", event.target.value)}} />
            </div>

            <MyButton type={"submit"} text={"Change Password"} icon={"bi bi-safe"} />

        </form>
    );

}