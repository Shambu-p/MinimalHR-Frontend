import ImageInput from "./Extra/ImageInput";
import MyInput from "./Extra/MyInput";
import FileInput from "./Extra/FileInput";
import SelectInput from "./Extra/SelectInput";
import AddressCard from "./AddressCard";
import MyButton from "./Extra/MyButton";
import React, {useEffect, useState} from "react";
import AddressModel from "../Models/AddressModel";
import {Request} from "../API.Interaction/api";
import DepartmentModel from "../Models/DepartmentModel";

export default function ({department_input, createOnSubmit}: {
    department_input: boolean,
    createOnSubmit?: (data: {address: any, detail: any}) => void
}){

    const [Inputs, setInputs] = useState<{
        profile_picture: any,
        full_name: string,
        email: string,
        phone_number: string,
        documents: any,
        department_id: number,
        education_level: string,
        salary: number,
        position: string
    }>({
        profile_picture: "",
        full_name: "",
        email: "",
        phone_number: "",
        documents: "",
        department_id: 0,
        education_level: "",
        position: "",
        salary: 0
    });
    const [addresses, setAddresses] = useState<AddressModel[]>([]);
    const [departments, setDepartments] = useState<DepartmentModel[]>([])

    useEffect(() => {

        let loadDepartment = async () => {
            setDepartments(await Request("get", "/Department/all"));
        };

        if(department_input) {
            loadDepartment();
        }

    }, []);


    const onChangeInput = (field: string, value: any) => {
        let inp: any = {...Inputs};
        inp[field] = value;
        setInputs(inp);
    };

    const addAddress = (data: AddressModel) => {
        setAddresses([...addresses, data]);
    }

    const deleteAddress = (data: AddressModel) => {

        setAddresses(
            addresses.filter(address => {
                if(
                    address.street_name !== data.street_name &&
                    address.place_name !== data.place_name &&
                    address.phone_number !== data.phone_number &&
                    address.sub_city !== data.sub_city &&
                    address.city !== data.city
                ) {return address;}
            })
        );

    };

    const editAddress = (data: AddressModel) => {

    };

    const createEmployee = () => {

        if(createOnSubmit){
            createOnSubmit({
                address: addresses,
                detail: Inputs
            });
        }

    };

    let index = -1;

    return (
        <div className="p-3">
            <h4 className="display-4 text-center">Application Form</h4>
            <p className="lead mb-3 text-center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dignissimos
                incidunt magni necessitatibus neque obcaecati, odio perferendis quod sed vel,
                veritatis, voluptas. Enim exercitationem neque nisi obcaecati quae quia unde!
            </p>
            <div className="row mb-5">
                <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                    <ImageInput onChange={(file: any) => {onChangeInput("profile_picture", file);}} />
                </div>
                <div className="col pl-3">
                    <div className="input-group mb-3">
                        <MyInput value={Inputs.full_name} type="text" placeholder="Full Name" icon="bi bi-person" onChange={(event: any) => {onChangeInput("full_name", event.target.value);}} />
                    </div>
                    <div className="input-group mb-3">
                        <MyInput value={Inputs.email} type="email" placeholder="Email Address" icon="bi bi-envelope-fill" onChange={(event: any) => {onChangeInput("email", event.target.value);}} />
                    </div>
                    <div className="input-group mb-3">
                        <MyInput value={Inputs.phone_number} type="text" placeholder="Phone Number" icon="bi bi-phone-vibrate" onChange={(event: any) => {onChangeInput("phone_number", event.target.value);}} />
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col pl-3">
                    <p className="lead text-right">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dignissimos
                        incidunt magni necessitatibus neque obcaecati, odio perferendis quod sed vel,
                        veritatis, voluptas. Enim exercitationem neque nisi obcaecati quae quia unde!
                    </p>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <FileInput onChange={(file: any) => {onChangeInput("documents", file);}} />
                </div>
            </div>

            <p className="lead text-center mb-3 mt-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dignissimos
                incidunt magni necessitatibus neque obcaecati, odio perferendis quod sed vel,
                veritatis, voluptas. Enim exercitationem neque nisi obcaecati quae quia unde!
            </p>

            <div className="input-group mb-5">
                <div className="input-group mb-3">
                    <SelectInput
                        icon="bi bi-award"
                        list={[
                            {key: "ba", value: "Bachelors of Art, Humanities and Social Sciences"},
                            {key: "bsc", value: "Bachelor of Sciences"},
                            {key: "beng", value: "Bachelors of Engineering (Software, Robotics and Physics)"},
                            {key: "llb", value: "Bachelors of Law"}
                        ]}
                        placeholder="Education Level"
                        onChange={(item: any) => {onChangeInput("education_level", item.key);}}
                    />
                </div>
            </div>

            {department_input ? (
                <div>
                    <p className="lead text-center mb-3 mt-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dignissimos
                        incidunt magni necessitatibus neque obcaecati, odio perferendis quod sed vel,
                        veritatis, voluptas. Enim exercitationem neque nisi obcaecati quae quia unde!
                    </p>
                    <div className="input-group mb-3">
                        <SelectInput
                            icon="bi bi-bookmark-fill"
                            list={departments.map(dept => ({key: dept.id, value: dept.name}))}
                            placeholder="Select Department"
                            onChange={(item: any) => {onChangeInput("department_id", item.key);}}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <MyInput value={Inputs.position} type="text" placeholder="Position" icon="bi bi-tags-fill" onChange={(event: any) => {onChangeInput("position", event.target.value);}} />
                    </div>
                    <div className="input-group mb-5">
                        <MyInput value={Inputs.salary} type="number" placeholder="Salary" icon="bi bi-coin" onChange={(event: any) => {onChangeInput("salary", event.target.value);}} />
                    </div>
                </div>
            ):(<></>)}


            <h4 className="card-title text-center">Address form</h4>
            <p className="lead text-center mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dignissimos
                incidunt magni necessitatibus neque obcaecati, odio perferendis quod sed vel,
                veritatis, voluptas. Enim exercitationem neque nisi obcaecati quae quia unde!
            </p>
            <div className="row" style={{margin: 0}}>
                {addresses.map(address => {
                    index += 1;
                    return (
                        <div className="col-sm-12 col-lg-6">
                            <AddressCard
                                data={address}
                                displayType={"show"}
                                editable={true}
                                onDeleteAction={deleteAddress}
                            />
                        </div>
                    );
                })}

                <div className="col-sm-12 col-lg-6">
                    <AddressCard displayType={"create"} createOnSubmit={addAddress} />
                </div>
            </div>

            <p className="lead mb-3 text-center" >
                by submitting this form you are accepting our privacy policy
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi deleniti fuga in ipsa
                quam repellat saepe sequi sint ullam? Aut beatae, impedit maiores molestiae officiis
                repellat ullam. Eaque, perspiciatis.
            </p>
            <MyButton text="Submit Form" icon="bi bi-check2-square" onClick={createEmployee} />

        </div>
    );

}