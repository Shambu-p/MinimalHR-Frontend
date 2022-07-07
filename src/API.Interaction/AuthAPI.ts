import {Request} from "./api";
import Users from "../Models/Users";

export async function Login(email: string, password: string){

    try{

        return await Request("post", "/Auth/login", {
            email: email,
            password: password
        });

    }catch(error){
        throw error;
    }

}

export async function information(token: string): Promise<{status: boolean, data: (Users | null)}> {

    try{

        let response = await Request("post", "/Auth/authorization", {token: token});

        return {
            status: true,
            data: {...response, token: token}
        };

    }catch ({message}){
        console.log(message);
    }

    return {
        status: false,
        data: null
    };

}

export async function registration(user_data: {
    name: string,
    email: string,
    age: number,
    grade: number,
    password: string,
    confirm_password: string
}): Promise<Users> {
    return Request("post", "/Users/register", user_data);
}
