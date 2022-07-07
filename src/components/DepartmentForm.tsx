import React, {useContext, useEffect, useState} from "react";
import MyInput from "./Extra/MyInput";
import SelectInput from "./Extra/SelectInput";
import MyButton from "./Extra/MyButton";
import {Request} from "../API.Interaction/api";
import AuthContext from "../Contexts/AuthContext";
import AlertContext from "../Contexts/AlertContext";
import {useNavigate, useParams} from "react-router-dom";

interface InputType { name: string, department_head: number }

export default function () {

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, removeCookie, authWaiting} = useContext(AuthContext);

    const params = useParams();
    const navigate = useNavigate();
    const [Inputs, setInputs] = useState<InputType>({
        name: "",
        department_head: 0
    });
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {

        let loadUsers = async () => {
            try{
                let response = await Request("post", "/Employees/employee_list", {token: loggedUser.token});
                setUsers(response);
            } catch({message}){
                setAlert(message, "danger");
            }
        };

        let loadDepartment = async () => {
            try{
                setInputs(await Request("get", "/Department/department_detail/"+params.department_id));
            } catch({message}) {
                setAlert(message, "danger");
            }
        };

        if(loggedUser) {
            loadUsers();
        }

        if(params.department_id) {
            loadDepartment();
        }

    }, [loggedUser]);

    const inputOnChange = (field: ("name"|"department_head"), value: any) => {
        let inp: any = {...Inputs};
        inp[field] = value;
        setInputs(inp);
    };

    const editDepartment = async (event: any) => {

        event.preventDefault();

        try{

            let response = await Request("post", "/Department/update", {
                token: loggedUser.token,
                department_name: Inputs.name,
                department_head: Inputs.department_head,
                department_id: params.department_id
            });

            navigate("/admin/department_view/"+params.department_id);

            setAlert("Department Changed Successfully!", "success");

        } catch ({message}) {
            setAlert(message, "danger");
        }

    };

    const createDepartment = async (event: any) => {

        event.preventDefault();

        try{

            let request: any = {
                token: loggedUser.token,
                name: Inputs.name
            };

            if(Inputs.department_head){
                request["department_head"] = Inputs.department_head;
            }

            let response = await Request("post", "/Department/create", request);
            navigate("/admin/department_list");
            setAlert("Department Created Successfully!", "success");

        } catch ({message}) {
            setAlert(message, "danger");
        }

    };

    return (
        <form onSubmit={params.department_id ? editDepartment : createDepartment} >

            <h5 className="display-4 text-center">Department Form</h5>

            <div className="input-group mb-3">
                <MyInput value={Inputs?.name} onChange={(event:any) => {inputOnChange("name", event.target.value)}} type="text" icon="bi bi-tag-fill" required={true} placeholder={"Department Name"} />
            </div>

            <div className="input-group mb-5">
                <SelectInput
                    list={users.map(user => ({key: user.id, value: user.full_name}))}
                    placeholder="Department Head"
                    icon="bi bi-person-fill"
                    onChange={(event:any) => {inputOnChange("department_head", event.key)}}
                />
            </div>

            {params.department_id ? (
                <MyButton text="Change Department" type="submit" icon="bi bi-pencil-square" />
            ) : (
                <MyButton text="Create Department" type="submit" icon="bi bi-plus" />
            )}

        </form>
    );

};