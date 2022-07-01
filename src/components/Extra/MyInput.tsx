import React, {ChangeEventHandler} from "react";

export default function (props: {
    placeholder?: string,
    type: "text"|"email"|"password"|"number"|"datetime-local"|"date",
    icon?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    required?: boolean,
    value?: string
}){

    return (
        <div className="my-input-container d-flex justify-content-between shadow-sm">

            <div className="input-icon-container">
                <i className={props.icon ?? "bi bi-person-badge"} />
            </div>
            <input value={props.value ?? ""} required={props.required ?? false} type={props.type} placeholder={props.placeholder} onChange={props.onChange} className="my-input" />

        </div>
    );
}
