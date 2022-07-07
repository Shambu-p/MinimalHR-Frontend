import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:8080/",
    // crossdomain: true,
    // headers: {
    //     "Referrer-Policy": "no-referrer",
    //     "Content-Type": 'multipart/form-data; boudary=' + form._boundary,
    //     "Content-Type": 'application/x-www-form-urlencoded',
    //     "Cache-Control": "no-cache",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    // }
});

export async function Request(type: string, url: string, request_data?: (object | FormData)): Promise<any>{
    try {

        let data = request_data ? prepareData(request_data) : new FormData();
        let response = ((type == "post") ? await api.post(url, data) : await api.get(url));
        if(response.data.message || response.data.message == ""){
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