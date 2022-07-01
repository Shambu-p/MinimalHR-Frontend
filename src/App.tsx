import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainHome from "./views/MainHome";
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
import VacanciesList from "./views/Admin/VacanciesList";
import Profile from "./views/Profile";


export default function (params: any) {

    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [loggedUser, setLoggedUser] = useState<null | Users>(null);
    const [cookies, setCookie, removeCookie] = useCookies(["login_token"]);
    // const [cookies, setCookies, removeCookies] = useState<string | null>(cookies.get("login_token"))
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showWaiting, setWaiting] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<"success"|"danger"|"warning"|"main">("main");
    const [alertPosition, setAlertPosition] = useState<"top-left-alert"|"bottom-left-alert"|"top-right-alert"|"bottom-right-alert">("top-left-alert");
    const [alertMessage, setMessage] = useState<string>("");

    useEffect(() => {

        const checkAuth = async (token: string) => {

            let response = await information(token);
            setLoggedIn(response.status);
            setLoggedUser(response.data);

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
            <AuthContext.Provider value={{isLoggedIn, loggedUser, setLoggedUser, setLoggedIn, setCookie, cookies, removeCookie}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainHome/>}/>
                        <Route path="/login" element={<LoginPage />}/>
                        <Route path="/check_application" element={<CheckApplication />}/>
                        <Route path="/application_form" element={<ApplicationForm />}/>
                        <Route path="/admin" element={<AdminMain />}>
                            <Route path="home" element={<Home />}/>
                            <Route path="new_employee" element={<NewEmployee />}/>
                            <Route path="employees" element={<EmployeesList />}/>
                            <Route path="vacancies" element={<VacanciesList />}/>
                            <Route path="create_vacancy" element={<CreateVacancy />}/>
                            <Route path="profile/:employee_id" element={<Profile />}/>
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