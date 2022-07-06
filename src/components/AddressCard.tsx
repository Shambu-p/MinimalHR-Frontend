import React, {useEffect, useState} from "react";
import AddressModel from "../Models/AddressModel";
import MyInput from "./Extra/MyInput";
import MyButton from "./Extra/MyButton";

export default function ({data, displayType, editable, editOnSubmit, createOnSubmit, onDeleteAction}:{
        data?: AddressModel,
        displayType: ("show"|"create"),
        editable?: boolean,
        editOnSubmit?: (event: AddressModel) => void,
        createOnSubmit?: (event: AddressModel) => void,
        onDeleteAction?: (event: AddressModel) => void
    }
) {

    const initial_input: AddressModel = {
        phone_number: "",
        city: "",
        sub_city: "",
        place_name: "",
        street_name: ""
    };

    const [currentState, setState] = useState<"show"|"edit"|"create">("show");
    const [Inputs, setInputs] = useState<AddressModel>(initial_input);
    const [dataDisplay, setDataDisplay] = useState<AddressModel | null>(null);

    useEffect(() => {
        setState(displayType);
        setInputs(data ?? initial_input);
        setDataDisplay(data ?? null);
    }, [displayType, data]);

    const inputOnChange = (field: string, value: string) => {
        let inp: any = {...Inputs};
        inp[field] = value;
        setInputs(inp);
    }

    const addAddress = (event: any) => {
        event.preventDefault();
        if(createOnSubmit){
            createOnSubmit(Inputs);
            setInputs(initial_input);
        }
    };

    const deleteAddress = () => {
        if(onDeleteAction && dataDisplay) {
            onDeleteAction(dataDisplay);
        }
    };

    const editAddress = (event: any) => {
        event.preventDefault();
        if(editOnSubmit){
            editOnSubmit(Inputs);
            setInputs(initial_input);
            setDataDisplay({...dataDisplay, ...Inputs});
            setState("show");
        }
    };

    let showDisplay = (
        <form onSubmit={editAddress} className="bg-white p-3 mb-3 shadow-sm rounded">
            {dataDisplay && dataDisplay.phone_number ? (
                <span className="d-flex">
                    <i className="bi bi-phone-vibrate mr-2" style={{fontSize: "2rem"}}/>
                    <span style={{fontSize: "25px", marginTop: "auto", marginBottom: "auto"}}>{dataDisplay.phone_number}</span>
                </span>
            ) : ""}

            {currentState == "edit" ? (<div className="input-group mb-3">
                <MyInput type="text" placeholder="Phone Number" value={Inputs.phone_number} icon="bi bi-phone-vibrate" onChange={(event: any) => {inputOnChange("phone_number", event.target.value);}} />
            </div>) : (<></>)}

            <span className="d-flex">
                <i className="bi bi-geo-alt-fill mr-2" style={{fontSize: "2rem"}}/>
                <span style={{fontSize: "25px", marginTop: "auto", marginBottom: "auto"}}>{dataDisplay && dataDisplay.city}</span>
            </span>

            {currentState == "edit" ? (<div className="input-group mb-3">
                <MyInput required={true} value={Inputs.city} type="text" placeholder="City Name" icon="bi bi-geo-alt-fill" onChange={(event: any) => {inputOnChange("city", event.target.value);}} />
            </div>) : (<></>)}

            <span className="d-flex">
                <i className="bi bi-geo-alt-fill mr-2" style={{fontSize: "2rem"}}/>
                <span style={{fontSize: "25px", marginTop: "auto", marginBottom: "auto"}}>{dataDisplay && dataDisplay.sub_city}</span>
            </span>

            {currentState == "edit" ? (<div className="input-group mb-3">
                <MyInput required={true} value={Inputs.sub_city} type="text" placeholder="Sub City Name" icon="bi bi-geo-alt-fill" onChange={(event: any) => {inputOnChange("sub_city", event.target.value);}} />
            </div>) : (<></>)}

            {dataDisplay && dataDisplay.place_name ? (
                <span className="d-flex">
                    <i className="bi bi-geo-fill mr-2" style={{fontSize: "2rem"}}/>
                    <span style={{fontSize: "25px", marginTop: "auto", marginBottom: "auto"}}>{dataDisplay.place_name}</span>
                </span>
            ) : ""}

            {currentState == "edit" ? (<div className="input-group mb-3">
                <MyInput value={Inputs.place_name} type="text" placeholder="Place Name" icon="bi bi-geo-fill" onChange={(event: any) => {inputOnChange("place_name", event.target.value);}} />
            </div>) : (<></>)}

            {dataDisplay && dataDisplay.street_name ? (
                <span className="d-flex">
                    <i className="bi bi-signpost-fill mr-2" style={{fontSize: "2rem"}}/>
                    <span style={{fontSize: "25px", marginTop: "auto", marginBottom: "auto"}}>{dataDisplay.street_name}</span>
                </span>
            ) : ""}

            {currentState == "edit" ? (<div className="input-group mb-3">
                <MyInput value={Inputs.street_name} type="text" placeholder="Street Name" icon="bi bi-signpost-fill" onChange={(event: any) => {inputOnChange("street_name", event.target.value);}} />
            </div>) : (<></>)}


            {currentState == "edit" ? (
                <div className="d-flex mt-4 justify-content-center">
                    <button className="icon_button rounded mr-3" type="button">
                        <i className="bi bi-x-square-fill text-danger" onClick={() => {setState("show");}}/>
                    </button>
                    <button className="icon_button rounded mr-3" type="submit" onClick={editAddress}>
                        <i className="bi bi-save-fill text-success" />
                    </button>
                </div>
            ) : (
                editable ? (
                    <div className="d-flex mt-4 justify-content-center">
                        <button className="icon_button rounded mr-3" type="button">
                            <i className="bi bi-pencil-square text-info" onClick={() => {setState("edit");}}/>
                        </button>

                        <button className="icon_button rounded mr-3" type="button" onClick={deleteAddress}>
                            <i className="bi bi-trash3 text-danger" />
                        </button>
                    </div>
                ) : (<></>)

            )}

        </form>
    );

    let createDisplay = (
        <form onSubmit={addAddress} className="bg-white p-3 mb-3 shadow-sm rounded">
            <div className="input-group mb-3">
                <MyInput value={Inputs.phone_number} type="text" placeholder="Phone Number" icon="bi bi-phone-vibrate" onChange={(event: any) => {inputOnChange("phone_number", event.target.value);}} />
            </div>
            <div className="input-group mb-3">
                <MyInput value={Inputs.city} type="text" placeholder="City Name" icon="bi bi-geo-alt-fill" onChange={(event: any) => {inputOnChange("city", event.target.value);}} />
            </div>
            <div className="input-group mb-3">
                <MyInput value={Inputs.sub_city} type="text" placeholder="Sub City Name" icon="bi bi-map" onChange={(event: any) => {inputOnChange("sub_city", event.target.value);}} />
            </div>
            <div className="input-group mb-3">
                <MyInput value={Inputs.place_name} type="text" placeholder="Place Name" icon="bi bi-geo-fill" onChange={(event: any) => {inputOnChange("place_name", event.target.value);}} />
            </div>
            <div className="input-group mb-3">
                <MyInput value={Inputs.street_name} type="text" placeholder="Street Name" icon="bi bi-signpost-fill" onChange={(event: any) => {inputOnChange("street_name", event.target.value);}} />
            </div>

            <div className="d-flex justify-content-end">
                <button className="icon_button rounded mr-3" type="submit">
                    <i className="bi bi-plus-square-fill text-success" /> Save
                </button>
            </div>
        </form>
    );

    // let editDisplay = (
    //     <form onSubmit={editAddress} className="bg-white p-3 mb-3 shadow-sm rounded">
    //         <div className="input-group mb-3">
    //             <MyInput value={data.phone_number} type="text" placeholder="Phone Number" icon="bi bi-phone-vibrate" />
    //         </div>
    //         <div className="input-group mb-3">
    //             <MyInput value={data.city} type="text" placeholder="City Name" icon="bi bi-geo-alt-fill"  />
    //         </div>
    //         <div className="input-group mb-3">
    //             <MyInput value={data.sub_city} type="text" placeholder="Sub City Name" icon="bi bi-map" />
    //         </div>
    //         <div className="input-group mb-3">
    //             <MyInput value={data.place_name} type="text" placeholder="Place Name" icon="bi bi-geo-fill" />
    //         </div>
    //         <div className="input-group mb-3">
    //             <MyInput value={data.street_name} type="text" placeholder="Street Name" icon="bi bi-signpost-fill" />
    //         </div>
    //
    //         <div className="d-flex justify-content-end">
    //             <i className="bi bi-brush-fill text-info mr-3 icon_button rounded" onClick={() => {setState("edit");}}/>
    //             <i className="bi bi-trash-fill text-danger mr-3 icon_button rounded" />
    //             <MyButton text="Add" icon="bi bi-plus" color="success"/>
    //         </div>
    //     </form>
    // );

    if(currentState == "create"){
        return createDisplay;
    }else {
        return showDisplay;
    }

}