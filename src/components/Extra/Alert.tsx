import React from "react";

export default function (props: {
    position?: string,
    message: string,
    color: "success"|"danger"|"warning"|"main"
}){

    let alert_color = "my-alert-" + props.color;

    return (
        <div className={alert_color + " d-flex rounded shadow-lg my-alert " + (props.position ?? "top-left-alert")}>
            <div className="alert-icon-container">
                <i className={"bi bi-check2"} />
            </div>
            <div className={"text-container rounded-right "}>
                <h5 className="card-title">The Title Here</h5>
                <p>{props.message}</p>
            </div>
        </div>
    );

}