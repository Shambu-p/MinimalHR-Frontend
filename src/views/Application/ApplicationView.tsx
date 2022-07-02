import UserView from "../../components/UserView";
import {useParams} from "react-router-dom";
import React from "react";
import MainAppbar from "../../components/AppBars/Main";

export default function (){

    const params = useParams();

    return (
        <div className="container">
            <MainAppbar page="home" />
            <UserView id={parseInt(params.application_number ?? "0")} type={"application"} />
        </div>
    );

}