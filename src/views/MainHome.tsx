import React, {useContext} from "react";
import {Box, Typography} from "@mui/material";
import MainAppbar from '../components/AppBars/Main';
import MyButton from "../components/Extra/MyButton";
import MyInput from "../components/Extra/MyInput";
import VacancyCard from "../components/Vacancy/VacancyCard";
import SelectInput from "../components/Extra/SelectInput";
import AlertContext from "../Contexts/AlertContext";

export default function (){


    return (
        <div className="container p-0">
            <MainAppbar page="home" />
            <div className="d-flex justify-content-between home-inputs mb-3">
                <div className="input-group pr-2 pl-2">
                    <MyInput type="text" placeholder="Search by Position" icon="bi bi-search" />
                </div>
                <div className="input-group pr-2 pl-2">
                    {/*<MyInput type="text" placeholder="Select Department" icon="bi bi-caret-down" />*/}
                    <div className="w-100">
                        <SelectInput list={[
                            {key: 1, value: "Department One"},
                            {key: 2, value: "Department Two"},
                            {key: 3, value: "Department Three"}
                        ]} placeholder="Select Department" icon="bi bi-caret-down" />
                    </div>
                </div>
            </div>
            <div className="p-2">
                {/*<VacancyCard />*/}
                {/*<VacancyCard />*/}
            </div>

        </div>
    );
    
}

//            <MyInput type="password" placeholder={"hello"} />