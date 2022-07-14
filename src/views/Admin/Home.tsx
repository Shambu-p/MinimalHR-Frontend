import MyButton from "../../components/Extra/MyButton";
import React from "react";
import MainAppBar from "../../components/AppBars/Main";

export default function (){

    return (
        <div>
            <div className='p-4 rounded shadow-sm bg-white'>
                <h4 className="display-4">Welcome Home</h4>
                <p className="lead mb-5">
                    Here you can find everything you need <br/>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo pariatur quasi sunt! Id illo,
                    nam quisquam quos sequi similique sunt voluptatum? Accusamus dicta illum non provident, veniam
                    voluptates. Animi, consectetur.
                </p>
                <MyButton text="Home" icon="bi bi-house" />
            </div>
        </div>
    );

}