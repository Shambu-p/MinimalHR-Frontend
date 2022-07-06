import React from "react";
import VacancyForm from "../Vacancy/VacancyForm";
import {useParams} from "react-router-dom";

export default function (){

    const params = useParams();

    return (
        <VacancyForm vacancy_id={parseInt(params.vacancy_id ?? "0")} />
    );
}