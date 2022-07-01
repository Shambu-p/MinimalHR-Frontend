import React, {useContext, useEffect, useState} from "react";
import MyButton from "../../components/Extra/MyButton";
import {useNavigate} from "react-router-dom";
import TableDisplay from "../../components/Extra/TableDisplay";
import {Request} from "../../API.Interaction/api";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";

export default function () {

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie, cookies} = useContext(AuthContext);

    const navigate = useNavigate();
    const [employeeList, setEmployeeList] = useState<any[]>([]);

    useEffect(() => {

        const load = async () => {
            setTimeout(() => {setWaiting(true)}, 1);
            let response = await Request("post", "/Employees/employee_list", {token: loggedUser.token});
            setEmployeeList(response);
            setWaiting(false);
        };

        if(loggedUser){
            load();
        }

    }, [loggedUser]);

    const row = employeeList.map(employee => {
        let emp = [];

        emp.push(employee.phone_number);
        emp.push(employee.full_name);
        emp.push(employee.email);
        emp.push(employee.salary);
        emp.push(employee.education_level);
        emp.push(employee.position);
        emp.push(
            <button className="icon_button rounded" type="submit" onClick={() => {navigate("/admin/profile/" + employee.id)}}>
                <i className="bi bi-eye-fill text-success" />
            </button>
        );

        return emp;
    });
    //     [
    //     ["Mark", "otto", "@mdo", (<i className="bi bi-trash-fill" />)],
    //     ["Shambu", "nazu", "@eth", (<i className="bi bi-trash-fill" />)]
    // ];

    const column = ["Phone Number", "Full Name", "Email", "Salary", "Education Level", "Position"];

    return (
        <div className="rounded shadow-sm pl-2 pr-2 pt-3 pb-3 bg-white">

            <div className="d-flex justify-content-end mb-3">
                <MyButton icon="bi bi-plus" text="Employee" onClick={() => {navigate("/admin/new_employee")}} />
            </div>

            <TableDisplay rows={row} columns={column} />

        </div>
    );
}

/*
<table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </table>
 */