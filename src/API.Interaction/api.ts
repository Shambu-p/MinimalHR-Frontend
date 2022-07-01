import axios from "axios";

// let form = new FormData();
// form.append("", "", "")

const api = axios.create({
    baseURL: "http://localhost:8080/",
    // crossdomain: true,
    // headers: {
    //     "Referrer-Policy": "no-referrer",
    //     "Content-Type": 'multipart/form-data; boudary=' + form._boundary,
    //     "Content-Type": 'application/x-www-form-urlencoded',
    //     "Cache-Control": "no-cache",
    //     "Postman-Token": "42e6c291-9a09-c29f-f28f-11872e2490a5",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    // }
    // baseURL: "http://192.168.1.15:1111/"
});

export async function Request(type: string, url: string, request_data?: (object | FormData)): Promise<any>{
    try {

        let data = request_data ? prepareData(request_data) : new FormData();
        let response = ((type == "post") ? await api.post(url, data) : await api.get(url));
        if(response.data.message){
            throw new Error(response.data.message);
        }
        // console.log(response);

        return response.data;

    }catch(error){
        throw error;
    }
}

function prepareData(request_data: any): FormData{

    if(typeof request_data !== "object"){
        return new FormData();
    }

    let req_data = new FormData();
    let arr = Object.keys(request_data);

    if(arr.length > 0){
        arr.forEach(key => {req_data.append(key, request_data[key])});
    }

    return req_data;

}

export default api;