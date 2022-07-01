import React, {useState} from "react";

export default function (props: {
    onChange?: (file: any) => void,
    icon?: string
}){

    const [fileName, setFileName] = useState<string>("Select File");

    const fileOnChange = (event: any) => {
        let file = event.target.files ?? null;
        setFileName(file ? file[0].name:"incorrect file");
        if(props.onChange){
            props.onChange(file[0]);
        }
    }

    return (
        <div className="p-2 rounded file-input d-flex" onClick={() => {
            //@ts-ignore
            window.document.getElementById("my_file_input").click();
        }}>
            <input id="my_file_input" type="file" onChange={fileOnChange} style={{display: "none"}} />
            <i className={props.icon ?? "bi bi-file-earmark-zip"} /> <br/>
            <span className="file-input-text">
                {fileName}
            </span>
        </div>
    );
}