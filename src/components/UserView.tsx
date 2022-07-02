import React, {useContext, useEffect, useState} from "react";
import ImageInput from "../components/Extra/ImageInput";
import AddressCard from "../components/AddressCard";
import AlertContext from "../Contexts/AlertContext";
import AuthContext from "../Contexts/AuthContext";
import {Request} from "../API.Interaction/api";
import AddressModel from "../Models/AddressModel";

export default function (props: {id: number, type: ("application"|"profile")}) {

    const {setAlert, setWaiting} = useContext(AlertContext);
    const {isLoggedIn, loggedUser, cookies} = useContext(AuthContext);

    const [employee, setEmployee] = useState<any>({});
    const [addresses, setAddresses] = useState<any[]>([]);

    useEffect(() => {

        setTimeout(() => {setWaiting(true)}, 1);

        let loadUser = async () => {

            let response = await Request("post", "Employees/employee_detail", {
                token: loggedUser.token,
                employee_id: props.id
            });

            setEmployee(response.detail);
            setAddresses(response.address);
            setWaiting(false);

        };

        let loadApplication = async () => {

            let response = await Request("get", "/Employees/check_application/" + props.id);

            setEmployee(response.detail);
            setAddresses(response.address);
            setWaiting(false);

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

            // let f_address = addresses.filter(address => {
            //     return address.id != address_id;
            // });
            // setAddresses(f_address);

            setAlert("address Changed!", "success");
            setWaiting(false);

        } catch({message}) {
            setAlert(message, "danger");
            setWaiting(false);
        }

    };

    let index = -1;

    return employee ? (
        <div >
            <div className="row pt-4 pb-4 alert-info" style={{margin: 0}}>
                <div className="col pl-4">
                    <ImageInput src={"http://localhost:8080/Employees/profile_picture/"+(props.type == "profile" ? props.id : employee.id)} />
                </div>
                <div className="col-sm-12 col-lg-9 d-flex">

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
                            {employee.employee_department}
                        </div>
                        <div className="lead mb-4">
                            <i className="bi bi-tags-fill mr-3" />
                            {employee.position}
                        </div>

                        <h4 className="card-subtitle mb-4">
                            <i className="bi bi-coin mr-3" />
                            <b>{employee.salary} ETB</b>
                        </h4>

                        <button className="icon_button rounded mr-3" type="submit">
                            <i className="bi bi-pencil-square text-primary" /> Edit
                        </button>
                        <button className="icon_button rounded" type="submit">
                            <i className="bi bi-download text-success" /> Documents
                        </button>

                    </div>

                </div>
            </div>

            <div className="bg-white p-3 mb-3 border-bottom">
                <div className="container d-flex justify-content-between">

                    <span style={{fontSize: "25px"}}>
                        <i className="bi bi-clipboard2-pulse-fill text-primary mr-3" />
                        {employee.status}
                    </span>
                    <span style={{fontSize: "25px"}}>
                        <i className="bi bi-calendar-date text-success mr-3" />
                        Start Working
                    </span>
                    <span style={{fontSize: "25px"}}>
                        <i className="bi bi-calendar-date text-danger mr-3" />
                        Termination Date
                    </span>
                </div>
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
    ) : (<></>);

}