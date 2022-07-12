import React, {useState} from "react";
import MyInput from "./Extra/MyInput";
import MyButton from "./Extra/MyButton";

interface InputInterface {
    email: string,
    verification_code: string,
    new_password: string,
    confirm_password: string
}

export default function (props: {type: ("find"|"verify"|"new_password"), onSubmit: (input_value: any) => void}) {

    const [Inputs, setInputs] = useState<InputInterface>({
        email: "",
        verification_code: "",
        new_password: "",
        confirm_password: ""
    });

    let inputOnChange = (input_name: ("email"|"verification_code"|"new_password"|"confirm_password"), value: string | any) => {
        let inp: InputInterface = {...Inputs};
        inp[input_name] = value;
        setInputs(inp);
    };

    const formSubmit = (event: any) => {
        event.preventDefault();
        if (props.type == "find") {
            props.onSubmit(Inputs.email);
        } else if(props.type == "new_password") {
            props.onSubmit({
                new_password: Inputs.new_password,
                confirm_password: Inputs.confirm_password
            });
        }
        else {
            props.onSubmit(Inputs.verification_code);
        }
    };

    if (props.type == "new_password") {
        return (
            <form onSubmit={formSubmit} className="card-body bg-white rounded shadow-sm">

                <h1 className="display-4 text-center">Create New Password</h1>

                <p className={"lead text-center mb-5"}>
                    set your new password in the next field you should set the same password as the first field to
                    confirm.
                    then starting from your next login the password you should use this new password on your sign in
                    form.
                </p>

                <div className="input-group mb-3">
                    <MyInput required={true} placeholder={"New Password"} type={"password"} icon={"bi bi-key"}/>
                </div>

                <div className="input-group mb-5">
                    <MyInput required={true} placeholder={"Confirm Password"} type={"password"} icon={"bi bi-key"}/>
                </div>

                <MyButton icon={"bi bi-safe"} type={"submit"} text={"Create"}/>
            </form>
        );
    }
    else if (props.type == "find") {
        return (
            <form onSubmit={formSubmit} className="card-body rounded shadow-sm bg-white">

                <h1 className="text-center display-4">Find your account</h1>

                <div className="input-group mb-3">
                    <MyInput
                        value={Inputs.email}
                        onChange={(event: any) => inputOnChange("email", event.target.value)}
                        type="text"
                        placeholder="Email Address"
                        required={true}
                        icon="bi bi-envelope-fill"
                    />
                </div>

                <p className="mb-5 lead">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur cum eius eos est
                    exercitationem fugit nostrum quaerat! Aperiam eaque ex fuga id ipsa iste itaque laboriosam
                    nesciunt numquam similique.
                </p>

                <MyButton text="Find Account" icon="bi bi-search" type="submit"/>

            </form>
        );
    }

    return (
        <form onSubmit={formSubmit} className="card-body rounded shadow-sm bg-white">

            <h1 className="text-center display-4">Verify you are the account owner</h1>

            <div className="input-group mb-3">
                <MyInput
                    value={Inputs.verification_code}
                    onChange={(event: any) => inputOnChange("verification_code", event.target.value)}
                    type="text"
                    placeholder="Verification Code"
                    required={true}
                    icon="bi bi-key"
                />
            </div>

            <p className="mb-5 lead">
                Email containing your verification code has been sent to your email address. enter the code here.
            </p>

            <MyButton text="Verify" icon="bi bi-check-square" type="submit"/>

        </form>
    );

};