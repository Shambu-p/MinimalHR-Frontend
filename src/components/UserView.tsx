import React, {useContext, useEffect, useState} from "react";
import ImageInput from "../components/Extra/ImageInput";
import AddressCard from "../components/AddressCard";
import AlertContext from "../Contexts/AlertContext";
import AuthContext from "../Contexts/AuthContext";
import {Request} from "../API.Interaction/api";
import AddressModel from "../Models/AddressModel";
import MyButton from "./Extra/MyButton";
import DepartmentModel from "../Models/DepartmentModel";
import {useNavigate} from "react-router-dom";

export default function (props: {id: number, type: ("application"|"profile")}) {

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, cookies} = useContext(AuthContext);

    const navigate = useNavigate();
    const [employee, setEmployee] = useState<any>(null);
    const [account, setAccount] = useState<any>({});
    const [department, setDepartment] = useState<DepartmentModel>();
    const [eventDate, setEventDate] = useState<any>({});
    const [addresses, setAddresses] = useState<any[]>([]);

    useEffect(() => {

        setTimeout(() => {setWaiting(true)}, 1);

        let loadUser = async () => {

            let response = await Request("post", "Employees/employee_detail", {
                token: loggedUser.token,
                employee_id: props.id
            });

            setAccount(response.account);
            setAddresses(response.address);
            setEventDate(response.event_date);
            setEmployee(response.detail);
            setWaiting(false);

        };

        let loadApplication = async () => {

            let response = await Request("get", "/Employees/check_application/" + props.id);

            setAddresses(response.address);
            setDepartment(response.department);
            setEmployee(response.detail);
            setWaiting(false);

            if(response.detail.status == "pending"){
                changeApplicationState("viewed");
            }

        };

        if(props.type == "profile"){

            if(!isLoggedIn){
                setWaiting(false);
                return;
            }

            if(loggedUser){
                loadUser();
            }

        }else{
            loadApplication()
        }



    }, [loggedUser]);


    const newAddress = async (data: any) => {

        try {

            setTimeout(() => {setWaiting(true)}, 1);

            let response = await Request("post", "/Address/add_address", {
                ...data,
                employee_id: props.id,
                token: cookies.login_token
            });
            setAddresses([...addresses, response]);
            setAlert("address has been added successfully!", "success");
            setWaiting(false);

        }catch ({message}) {
            setWaiting(false);
            setAlert(message, "danger");
        }

    };

    const deleteAddress = async (address_id: number) => {

        try{

            setTimeout(() => {setWaiting(true)}, 1);
            await Request("post", "/Address/delete_address", {
                token: cookies.login_token,
                id: address_id,
                employee_id: loggedUser.employee_id
            });

            let f_address = addresses.filter(address => {
                return address.id != address_id;
            });

            setAddresses(f_address);
            setAlert("deleted!", "success");
            setWaiting(false);

        } catch({message}) {
            setAlert(message, "danger");
            setWaiting(false);
        }

    };

    const editAddress = async (data: AddressModel, id: number) => {

        try{

            setTimeout(() => {setWaiting(true)}, 1);
            await Request("post", "/Address/edit_address", {
                ...data,
                token: cookies.login_token,
                employee_id: loggedUser.employee_id,
                id: id
            });

            setAlert("address Changed!", "success");
            setWaiting(false);

        } catch({message}) {
            setAlert(message, "danger");
            setWaiting(false);
        }

    };

    const changeApplicationState = async (state: "accepted"|"viewed"|"rejected") => {

        try{

            setTimeout(() => {setWaiting(true)}, 1);
            await Request("post", "/Employees/change_application_status", {
                token: cookies.login_token,
                application_id: employee.id,
                status: state
            });

            setAlert("Status Changed!", "main");
            setWaiting(false);

        } catch({message}) {
            setAlert(message, "danger");
            setWaiting(false);
        }

    };

    const changeAccountStatus = async (state: "active"|"suspended"|"deactive") => {

        try{

            setTimeout(() => {setWaiting(true)}, 1);
            await Request("post", "/Account/change_status", {
                token: cookies.login_token,
                employee_id: employee.id,
                status: state
            });

            setAlert("Status Changed!", "main");
            setWaiting(false);

        } catch({message}) {
            setAlert(message, "danger");
            setWaiting(false);
        }

    };

    const changeProfilePicture = async (image: any) => {

        if(loggedUser.employee_id != props.id){
            console.log(loggedUser.employee_id, " ", props.id);
            return;
        }

        setTimeout(() => {setWaiting(true);}, 1);
        try{

            await Request("post", "Employees/change_profile_picture", {
                token: loggedUser.token,
                profile_picture: image
            });

            setAlert("image changed successfully", "success");

        } catch({message}){
            setAlert(message, "danger");
        }

        setWaiting(false);

    };

    let index = -1;

    return employee ? (
        <div >
            <div className="row pt-4 pb-4 alert-info" style={{margin: 0}}>
                <div className="col pl-4">
                    <ImageInput
                        src={"http://localhost:8080/Employees/profile_picture/"+(props.type == "profile" ? props.id : employee.id)}
                        onChange={changeProfilePicture}
                    />
                </div>
                <div className="col-sm-12 col-lg-9 d-flex home-inputs">

                    <div style={{margin: "auto"}}>

                        <h4 className="card-title mb-1">{employee.full_name}</h4>
                        <div className="card-subtitle mb-4">{employee.email}</div>

                        <div className="lead mb-2">
                            <i className="bi bi-award mr-3" />
                            {employee.education_level}
                        </div>
                        <h4 className="card-subtitle mb-4">
                            <i className="bi bi-phone-vibrate mr-3" />
                            <b>{employee.phone_number}</b>
                        </h4>

                    </div>

                    <div style={{margin: "auto"}}>

                        <div className="lead">
                            <i className="bi bi-bookmark mr-3" />
                            {department?.name}
                        </div>
                        <div className="lead mb-4">
                            <i className="bi bi-tags-fill mr-3" />
                            {employee.position}
                        </div>

                        <h4 className="card-subtitle mb-4">
                            <i className="bi bi-coin mr-3" />
                            <b>{employee.salary} ETB</b>
                        </h4>

                        {props.type == "profile" && loggedUser.employee_id == props.id ? (
                            <button className="icon_button rounded mr-3" type="button">
                                <i className="bi bi-pencil-square text-primary" /> Edit
                            </button>
                        ):""}
                        {props.type == "profile" && loggedUser.employee_id == props.id ? (
                            <button className="icon_button rounded mr-3" type="button" onClick={() => {navigate("/admin/change_password")}}>
                                <i className="bi bi-safe text-primary" /> Change Password
                            </button>
                        ):""}
                        <button
                            className="icon_button rounded"
                            type="button"
                            onClick={() => {window.open("http://localhost:8080/Employees/document/"+employee.id)}}
                        >
                            <i className="bi bi-download text-success" /> Documents
                        </button>

                    </div>

                </div>
            </div>

            <div className="bg-white p-3 mb-3 border-bottom">

                {props.type == "application" ? (
                    <div className="container pt-3 pb-3 border-bottom d-flex justify-content-between">
                        <span style={{fontSize: "25px"}}>
                            <i className="bi bi-clipboard2-pulse-fill text-primary mr-3" />
                            {employee.status}
                        </span>
                    </div>
                ):(
                    <div className="container pt-3 pb-3 border-bottom d-flex justify-content-between">
                        {eventDate.work_start_date ? (
                            <span style={{fontSize: "25px"}}>
                                <i className="bi bi-calendar-date text-success mr-3" />
                                Start Working {eventDate.work_start_date}
                            </span>
                        ): ""}
                        {eventDate.termination_date ? (
                            <span style={{fontSize: "25px"}}>
                                <i className="bi bi-calendar-date text-danger mr-3" />
                                Terminated on {eventDate.termination_date}
                            </span>
                        ): ""}

                    </div>
                )}

                {props.type == "profile" ? (
                    <div className="container pt-3 pb-3 d-flex justify-content-between">
                        {account.status == "active" ? (
                            <button className="icon_button rounded" type="submit" onClick={() => {changeAccountStatus("suspended")}}>
                                <i className="bi bi-person-dash-fill text-warning" /> Suspend
                            </button>
                        ):(
                            <button className="icon_button rounded" type="submit" onClick={() => {changeAccountStatus("active")}}>
                                <i className="bi bi-person-check-fill text-success" /> Activate
                            </button>
                        )}
                        {account.status != "deactive" ? (
                            <button className="icon_button rounded" type="submit" onClick={() => {changeAccountStatus("deactive")}}>
                                <i className="bi bi-person-x-fill text-danger" /> Deactivate
                            </button>
                        ):""}

                    </div>
                ) : (
                    ((employee.status == "pending" || employee.status == "viewed") && loggedUser && loggedUser.is_admin) ? (
                        <div className="container pt-3 pb-3 d-flex justify-content-between">
                            <button className="icon_button rounded" type="button" onClick={() => {changeApplicationState("accepted")}}>
                                <i className="bi bi-person-check-fill text-success" /> Accept
                            </button>
                            <button className="icon_button rounded" type="button" onClick={() => {changeApplicationState("rejected")}}>
                                <i className="bi bi-person-x-fill text-danger" /> Reject
                            </button>
                        </div>
                    ):""
                )}

            </div>

            <div className="row" style={{margin: 0}}>
                {

                    addresses.map(address => {
                        index += 1;
                        return (
                            <div key={index} className="col-sm-12 col-lg-6">
                                <AddressCard
                                    data={address}
                                    displayType={"show"}
                                    editable={(props.type == "profile" && props.id == loggedUser.employee_id)}
                                    onDeleteAction={(ad_data: any) => {deleteAddress(address.id);}}
                                    editOnSubmit={(ad_data: any) => {editAddress(ad_data, address.id)}}
                                />
                            </div>
                        );
                    })
                }

                {props.type == "profile" && props.id == loggedUser.employee_id ? (
                    <div className="col-sm-12 col-lg-6">
                        <AddressCard displayType={"create"} createOnSubmit={newAddress} />
                    </div>
                ):(<></>)}

            </div>

        </div>
    ) : (
        <div className="p-3 bg-white mt-5 shadow rounded">
            <h3 className="display-3 text-center">
                {props.type == "application" ? "Application not found!":"Account Not found!"}
            </h3>
            <p className="lead text-center mb-5">
                The id or the application number were not assigned to anyone. it could be because
                the id or the application number is incorrect otherwise it is system failure so
                try again later.
            </p>
            <MyButton text="Back to Home" icon="bi bi-house" />
        </div>
    );

}