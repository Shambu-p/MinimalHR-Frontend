import {useNavigate} from 'react-router-dom';
import React, {useContext} from 'react';
import AuthContext from "../../Contexts/AuthContext";

export default function (){

    const {isLoggedIn, loggedUser} = useContext<any>(AuthContext);

    const navigate = useNavigate();

    return (
        <div className="mb-3 d-flex justify-content-between" style={{background: "#133283"}}>
            <div className="pb-3 pt-3 pl-2 pr-2" style={{background: "white", width: "max-content"}}>
                <h4 className="display-4" > My HR </h4>
            </div>
            <div className="pr-3" style={{marginTop: "auto", marginBottom: "auto"}}>
                <button className="btn btn-lg btn-link" style={{color: "white"}} onClick={() => {navigate("/check_application");}}>Check Application</button>
                <button className="btn btn-lg btn-link" style={{color: "white"}} onClick={() => {navigate("/login");}}>Login</button>
                <button className="btn btn-lg btn-link" style={{color: "white"}} onClick={() => {navigate("/");}}>Home</button>
            </div>
        </div>
    );

}