import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";
import AlertContext from "../../Contexts/AlertContext";

export default function () {

    const {loggedUser, setLoggedUser, setLoggedIn, removeCookie} = useContext(AuthContext);

    const navigate = useNavigate();
    const [expand, setExpand] = useState<boolean>(true);

    const logout = () => {

        const d = new Date();
        d.setTime(d.getTime() - (24*60*60*1000));

        removeCookie("login_token", {path: "/", expires: d.toUTCString()});
        setLoggedUser(null);
        setLoggedIn(false);
        navigate("/login");

    };

    const sidebarSetting = () => {
        setExpand(expand ? false : true);
    };

    return !loggedUser ? (<></>) : (
        <div className="admin-sidebar pt-3 pb-3">
            <div className="d-flex justify-content-start border-bottom mb-3 p-2">
                <i className="bi bi-list admin-sidebar-button" onClick={sidebarSetting} />
            </div>
            <div id="admin_sidebar_content" style={{display: expand ? "block" : "none"}}>
                {loggedUser.is_admin == "1" ? (
                    <div className="mb-3">
                        <button className="admin-sidebar-item d-flex justify-content-end" onClick={() => {navigate("/admin/employees")}}>
                            Employees
                            <i className="bi bi-people-fill ml-2"/>
                        </button>
                    </div>
                ):(<></>)}

                {loggedUser.is_admin == "1" ? (
                    <div className="mb-3">
                        <button className="admin-sidebar-item d-flex justify-content-end" onClick={() => {navigate("/admin/vacancies")}}>
                            Vacancies
                            <i className="bi bi-briefcase-fill ml-2"/>
                        </button>
                        <button className="admin-sidebar-item d-flex justify-content-end" onClick={() => {navigate("/admin/department_list")}}>
                            Departments
                            <i className="bi bi-bookmark-fill ml-2"/>
                        </button>
                    </div>
                ):(<></>)}

                <div className="mb-3">
                    <button className="admin-sidebar-item d-flex justify-content-end" onClick={() => {navigate("/admin/profile/" + loggedUser.employee_id)}}>
                        Profile
                        <i className="bi bi-person-badge-fill ml-2"/>
                    </button>
                    <button className="admin-sidebar-item d-flex justify-content-end" onClick={logout}>
                        Sign Out
                        <i className="bi bi-door-closed ml-2"/>
                    </button>
                </div>
            </div>
        </div>
    );

}