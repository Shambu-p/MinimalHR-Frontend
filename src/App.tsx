import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login, information} from "./API.Interaction/AuthAPI";
import LoginPage from "./views/Login";
import Error from "./views/Error";
import AuthContext from "./Contexts/AuthContext";
import Users from "./Models/Users";
import CheckApplication from "./views/CheckApplication";
import AlertContext from "./Contexts/AlertContext";
import Alert from "./components/Extra/Alert";
import Waiting from "./components/Extra/Waiting";
import ApplicationForm from "./views/Application/ApplicationForm";
import NewEmployee from "./views/Admin/NewEmployee";
import AdminMain from "./views/Admin/AdminMain";
import Home from "./views/Admin/Home";
import EmployeesList from "./views/Admin/EmployeesList";
import {useCookies} from "react-cookie";
import CreateVacancy from "./views/Admin/CreateVacancy";
import Profile from "./views/Profile";
import ApplicationView from "./views/Application/ApplicationView";
import VacancyView from "./views/Vacancy/VacancyView";
import VacancyLister from "./views/Vacancy/VacancyLister";
import Applicants from "./views/Admin/Applicants";
import SingleApplicant from "./views/Admin/SingleApplicant";
import EditVacancy from "./views/Admin/EditVacancy";
import ChangePassword from "./views/Admin/ChangePassword";
import DepartmentList from "./views/Admin/DepartmentList";
import DepartmentView from "./views/Admin/DepartmentView";


export default function (params: any) {

    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [loggedUser, setLoggedUser] = useState<null | Users>(null);
    const [cookies, setCookie, removeCookie] = useCookies(["login_token"]);
    const [authWaiting, setAuthWaiting] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showWaiting, setWaiting] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<"success"|"danger"|"warning"|"main">("main");
    const [alertPosition, setAlertPosition] = useState<"top-left-alert"|"bottom-left-alert"|"top-right-alert"|"bottom-right-alert">("top-left-alert");
    const [alertMessage, setMessage] = useState<string>("");

    useEffect(() => {

        const checkAuth = async (token: string) => {

            setTimeout(() => {setAuthWaiting(true);}, 1);
            let response = await information(token);
            setLoggedIn(response.status);
            setLoggedUser(response.data);
            setAuthWaiting(false);

        };

        if(cookies.login_token && cookies.login_token != "") {
            checkAuth(cookies.login_token);
        }


    }, []);

    const setAlert = (
        message: string,
        type: "success"|"danger"|"warning"|"main",
        position?: "top-left-alert"|"bottom-left-alert"|"top-right-alert"|"bottom-right-alert"
    ) => {

        setAlertType(type);
        setAlertPosition(position ?? "top-left-alert");
        setShowAlert(true);
        setMessage(message)

        setTimeout( () => {
            setShowAlert(false);
        }, 3000);

    }

    return (
        <AlertContext.Provider value={{showAlert, alertType, setAlertType, setAlert, setWaiting}}>
            <AuthContext.Provider value={{isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie, cookies, removeCookie, authWaiting}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<VacancyLister/>}/>
                        <Route path="/login" element={<LoginPage />}/>
                        <Route path="/check_application" element={<CheckApplication />}/>
                        <Route path="/application_form/:vacancy_id" element={<ApplicationForm />}/>
                        <Route path="/view_application/:application_number" element={<ApplicationView />}/>
                        <Route path="/vacancy_view/:vacancy_id" element={<VacancyView />}/>
                        <Route path="/admin" element={<AdminMain />}>
                            <Route path="home" element={<Home />}/>
                            <Route path="new_employee" element={<NewEmployee />}/>
                            <Route path="employees" element={<EmployeesList />}/>
                            <Route path="vacancies" element={<VacancyLister />}/>
                            <Route path="create_vacancy" element={<CreateVacancy />}/>
                            <Route path="profile/:employee_id" element={<Profile />}/>
                            <Route path="vacancy_view/:vacancy_id" element={<VacancyView />}/>
                            <Route path="applicant_list/:vacancy_id" element={<Applicants />}/>
                            <Route path="view_application/:application_number" element={<SingleApplicant />}/>
                            <Route path="edit_vacancy/:vacancy_id" element={<EditVacancy />}/>
                            <Route path="change_password" element={<ChangePassword />}/>
                            <Route path="department_list" element={<DepartmentList />}/>
                            <Route path="department_view/:department_id" element={<DepartmentView />}/>
                        </Route>
                        <Route path="*" element={<Error/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
            {showAlert ? (<Alert message={alertMessage} color={alertType} position={alertPosition} />) : ""}
            {showWaiting ? (<Waiting />) : ""}
        </AlertContext.Provider>
    );

}

/*
<Route path="/exam" element={<Exams/>}>
                        <Route path="show" element={<ExamList />}/>
                        <Route path="create" element={<CreateExam/>}/>
                    </Route>

                    <Route path="/take_exam/:result_id/:exam_id" element={<Take/>}/>
                    <Route path="/exam_view/:exam_id" element={<Detail/>}/>
                    <Route path="/result_view/:result_id" element={<ResultView/>}/>
                    <Route path="/results" element={<ResultShow/>}/>
                    <Route path="/exam_detail/:exam_id" element={<ExamView/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<Registration/>}/>
 */