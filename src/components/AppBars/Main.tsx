import {useNavigate} from 'react-router-dom';
import React, {useContext, useEffect, useState} from 'react';
import {Logout, loginAuth} from '../../API.Interaction/AuthAPI';
import { Card, CardContent, ButtonGroup, Box, Button, Typography} from "@mui/material";
import Users from "../../Models/Users";
import AuthContext from "../../Contexts/AuthContext";
import MyButton from "../Extra/MyButton";

export default function (props: any){

    const {isLoggedIn, loggedUser} = useContext<any>(AuthContext);
    const navigate = useNavigate();
    const [logged_user, setLog] = useState<Users | null>(null);
    const [is_logged_in, setState] = useState(false);

    useEffect(function (){

        let checkAuth = async () => {

            let auth = await loginAuth();
            if(!auth.status){
                if(props.page !== "home"){
                    navigate("/login", {replace: true});
                    return;
                }
            }else{
                setState(auth.status);
                setLog(auth.data);
            }

        };

        // checkAuth();

    }, []);

    const logout = async () => {

        try{

            await Logout((logged_user !== null && logged_user.token) ? logged_user.token : "");
            setState(false);
            navigate("/login");
    
        }catch({message}){
            console.log(message);
        }

    };

    return (
        <div className="mb-3 d-flex justify-content-between" style={{background: "#133283"}}>
            <div className="pb-3 pt-3 pl-2 pr-2" style={{background: "white", width: "max-content"}}>
                <h4 className="display-4" > My HR </h4>
            </div>
            <div className="pr-3" style={{marginTop: "auto", marginBottom: "auto"}}>
                <button className="btn btn-lg btn-link" style={{color: "white"}} onClick={event => {navigate("/check_application");}}>Check Application</button>
                <button className="btn btn-lg btn-link" style={{color: "white"}} onClick={event => {navigate("/login");}}>Login</button>
                <button className="btn btn-lg btn-link" style={{color: "white"}} onClick={event => {navigate("/");}}>Home</button>
            </div>
        </div>
    );

}