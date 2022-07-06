import UserView from "../../components/UserView";
import React from "react";
import {useParams} from "react-router-dom";

export default function () {

    const params = useParams();

    return(<UserView id={parseInt(params.application_number ?? "0")} type={"application"} />);

}