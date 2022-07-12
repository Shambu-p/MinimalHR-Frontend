import React, {useContext} from 'react';
import AdminSideBar from "../../components/AppBars/AdminSideBar";
import MainAppBar from "../../components/AppBars/Main";
import {Outlet} from "react-router-dom";
import AlertContext from "../../Contexts/AlertContext";
import AuthContext from "../../Contexts/AuthContext";

export default function() {



    return (
        <div className="d-flex p-0 admin-container">
            <div className="col-sm-12 col-md-4 col-lg-2 pl-0">
                <AdminSideBar />
            </div>
            <div className="col admin-outlet-container">
                <div className="p-3 bg-white shadow-sm rounded mb-3 mt-3 d-flex justify-content-between">
                    <h5 className="card-title">HR Management</h5>
                    <i className="bi bi-person-circle" style={{fontSize: "30px", color: "#133283"}} />
                </div>
                <Outlet />
            </div>
        </div>
    );

}