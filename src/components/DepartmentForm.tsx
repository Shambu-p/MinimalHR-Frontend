import React, {useContext, useEffect, useState} from "react";
import MyInput from "./Extra/MyInput";
import SelectInput from "./Extra/SelectInput";
import MyButton from "./Extra/MyButton";
import AuthContext from "../Contexts/AuthContext";
import AlertContext from "../Contexts/AlertContext";
import {useNavigate, useParams} from "react-router-dom";
import UserAPI from "../API.Interaction/UserAPI";
import DepartmentAPI from "../API.Interaction/DepartmentAPI";

interface InputType { name: string, department_head: number }

export default function () {

    const {setAlert} = useContext(AlertContext);
    const {loggedUser} = useContext(AuthContext);

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
                let response = await UserAPI.getAll(loggedUser.token);
                setUsers(response);
            } catch({message}){
                setAlert(message, "danger");
            }
        };

        let loadDepartment = async () => {
            try{
                setInputs(await DepartmentAPI.departmentDetail(parseInt(params.department_id ?? "0")));
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

            let response = await DepartmentAPI.updateDepartment(loggedUser.token, parseInt(params.department_id ?? "0"), Inputs.name, Inputs.department_head);

            navigate("/admin/department_view/"+params.department_id);

            setAlert("Department Changed Successfully!", "success");

        } catch ({message}) {
            setAlert(message, "danger");
        }

    };

    const createDepartment = async (event: any) => {

        event.preventDefault();

        try{

            let response = await DepartmentAPI.createDepartment(loggedUser.token, Inputs.name, Inputs.department_head);
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