import MyInput from "../../components/Extra/MyInput";
import React, {useContext, useEffect, useState} from "react";
import SelectInput from "../../components/Extra/SelectInput";
import {Request} from "../../API.Interaction/api";
import MyButton from "../../components/Extra/MyButton";
import {createInterface, Interface} from "readline";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";
import {useNavigate} from "react-router-dom";

export default function (props: {vacancy_id?: number}){

    interface RequestType {
        position: any,
        salary: any,
        department_id: any,
        description: any,
        start_date: any,
        end_date: any,
        status: any
    }

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie, cookies} = useContext(AuthContext);

    const navigate = useNavigate();
    const [departments, setDepartments] = useState<any[]>([]);
    const [Inputs, setInputs] = useState<{
        position: any,
        salary: any,
        department_id: any,
        description: any,
        start_date: any,
        end_date: any,
        status: any
    }>({
        position: "",
        salary: 0,
        department_id: 0,
        description: "",
        start_date: "",
        end_date: "",
        status: ""
    });

    useEffect(() => {

        let loadDepartment = async () => {
            setDepartments(await Request("get", "/Department/all"));
        };

        let loadVacancy = async () => {
            try{
                let response = await Request("get", "/Vacancy/vacancy_detail/"+props.vacancy_id);
                setInputs(response.detail);
            } catch({message}){
                setAlert(message, "danger");
            }

        };

        loadDepartment();
        if(props.vacancy_id){
            loadVacancy();
        }

    }, []);

    let select_list = departments.map(dept => {
        return {
            key: dept.id,
            value: dept.name
        };
    });

    const inputOnChange = (field: ("position"|"salary"|"status"|"department_id"|"start_date"|"end_date"|"description"), value: any) => {
        let inp: RequestType = {...Inputs};
        inp[field] = value;
        setInputs(inp);
    };

    const submitForm = async (event: any) => {

        event.preventDefault();
        setTimeout(() => {setWaiting(true);}, 1);

        try{

            let response = await Request("post", "/Vacancy/post_vacancy", {...Inputs, token: cookies.login_token, employee_id: loggedUser.employee_id});
            setAlert("Vacancy Posted Successfully", "success");
            navigate("/admin/vacancies");

        } catch({message}){
            setAlert(message, "danger");
        }

        setTimeout(() => {setWaiting(false);}, 100);

    };

    const editVacancy = async (event: any) => {

        event.preventDefault();
        setTimeout(() => {setWaiting(true);}, 1);

        try{

            let response = await Request("post", "/Vacancy/update_vacancy", {
                ...Inputs,
                token: cookies.login_token,
                employee_id: loggedUser.employee_id,
                vacancy_id: props.vacancy_id
            });
            setAlert("Vacancy Posted Successfully", "success");
            navigate("/admin/vacancies");

        } catch({message}){
            setAlert(message, "danger");
        }

        setTimeout(() => {setWaiting(false);}, 100);

    };

    return (
        <form className="p-3" onSubmit={props.vacancy_id ? editVacancy : submitForm}>

            <h4 className="display-4 text-center mb-5">Create Vacancy Post</h4>

            <div className="input-group mb-3">
                <MyInput value={Inputs.position} required={true} placeholder="Position" icon="bi bi-pin-angle-fill" type="text" onChange={(event: any) => {inputOnChange("position", event.target.value);}} />
            </div>

            <div className="input-group mb-3">
                <SelectInput list={select_list} placeholder="Select Department" onChange={(object: any) => {inputOnChange("department_id", object.key);}} />
            </div>

            <div className="input-group mb-3">
                <MyInput value={Inputs.salary} required={true} placeholder="Salary" icon="bi bi-cash-coin" type="number" onChange={(event: any) => {inputOnChange("salary", event.target.value);}} />
            </div>

            <div className="input-group mb-5">
                <textarea
                    placeholder="description"
                    className="form-control form-control-lg"
                    aria-rowcount={30}
                    value={Inputs.description}
                    onChange={(event: any) => {inputOnChange("description", event.target.value);}}
                />
            </div>

            <div className="input-group mb-3">
                <SelectInput
                    list={[
                        {key: "open", value: "Active"},
                        {key: "closed", value: "Not Active"},
                    ]}
                    placeholder="Select Post State"
                    icon="bi bi-eye-fill"
                    onChange={(object: any) => {inputOnChange("status", object.key);}}
                />
            </div>

            <div className="input-group mb-3">
                <MyInput value={Inputs.start_date} required={true} placeholder="Start Date" icon="bi bi-calendar-event" type="datetime-local" onChange={(event: any) => {inputOnChange("start_date", event.target.value);}} />
            </div>

            <div className="input-group mb-3">
                <MyInput value={Inputs.end_date} required={true} placeholder="End Date" icon="bi bi-calendar-event" type="datetime-local" onChange={(event: any) => {inputOnChange("end_date", event.target.value);}} />
            </div>

            {props.vacancy_id ? (<MyButton text="Change" icon="bi bi-pencil-square" type="submit" />):(<MyButton text="Create" icon="bi bi-plus" type="submit"  />)}

        </form>
    );
}