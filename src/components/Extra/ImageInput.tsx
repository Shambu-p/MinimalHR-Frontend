import React, {useEffect, useState} from "react";

export default function (props: {
    src?: any,
    onChange?: (file: any) => void
}){

    const [image, setImage] = useState<any|null>(null);

    useEffect(() => {
        setImage(props.src);
    }, [props.src]);

    const fileOnChange = (event: any) => {

        let file = event.target.files ?? null;
        if(file[0]){
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file[0]);
            fileReader.onload = (e: any) => {
                setImage(e.target.result);
            }
        }

        if(props.onChange){
            props.onChange(file[0]);
        }
    }

    return (

        <div className="p-2 rounded image-input d-flex" onClick={
            () => {
                //@ts-ignore
                window.document.getElementById("my_image_input").click();
            }
        }>
            <input id="my_image_input" type="file" onChange={fileOnChange} style={{display: "none"}} />
            {image ? (<img className="image-input-image" src={image} alt="image"/>) : (<i className="bi bi-camera-fill" />)}
        </div>
    );
}