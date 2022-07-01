import React, {useState} from "react";
import MainAppBar from "../../components/AppBars/Main";
import MyButton from "../../components/Extra/MyButton";
import CreateEmployeeForm from "../../components/CreateEmployeeForm";

export default function () {

    const [submitted, setSubmitted] = useState<boolean>(false);

    const apply = (data: {address: any, detail: any}) => {

    };

    return (
        <div className="container">

            <MainAppBar />

            <div className="d-flex">
                {submitted ? (
                    <div className="w-75 p-3 rounded shadow-sm bg-white" style={{margin: "auto"}}>

                        <div className="d-flex">
                            <i className="bi bi-check2-circle mr-3 text-success" style={{fontSize: "6rem"}} />
                            <h5 className="display-4" style={{marginTop: "auto", marginBottom: "auto"}}>Application was Successful!</h5>
                        </div>
                        <p className="lead mb-3">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, dolore eligendi eos explicabo
                            iure necessitatibus praesentium quia reprehenderit. Autem error harum iste minima, minus numquam
                            odit officia quis similique voluptatem!
                        </p>

                        <MyButton text="OK" color="main" icon="bi bi-check2-square" />

                    </div>
                ) : (
                    <CreateEmployeeForm department_input={false} createOnSubmit={apply} />
                )}
            </div>

        </div>
    );

}