import React, {MouseEventHandler, useEffect} from "react";

export default function (props: {
    text: string,
    icon?: string,
    type?: "button"|"submit"|"reset",
    color?: "main"|"danger"|"success"
    onClick?: MouseEventHandler<HTMLButtonElement>
}){

    return (
        <button type={props.type ?? "button"} className={"mr-2 mb-3 my-button d-flex rounded shadow-sm my-button-" + (props.color ?? "main")} onClick={props.onClick ?? ((event: any) => {console.log("button clicked")}) }>
            <div className="icon-container">
                <i className={props.icon ?? "bi bi-alarm"} />
            </div>
            <span className="my-button-text-container">{props.text}</span>
        </button>
    );
}