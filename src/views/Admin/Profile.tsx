import React from "react";
import {useParams} from "react-router-dom";
import UserView from "../../components/UserView";

export default function () {

    const params = useParams();

    return (
        <UserView id={parseInt(params.employee_id ?? "0")} type={"profile"} />
    );

}