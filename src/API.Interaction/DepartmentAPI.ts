import {Request} from "./api";
import DepartmentModel from "../Models/DepartmentModel";

export default class DepartmentAPI {

    static async getAll(): Promise<DepartmentModel[]>{
        try{
            return await Request("get", "/Department/all");
        }catch(error) {
            throw error;
        }
    }

    /**
     * create new department
     * @param token
     *      signed in user authentication token
     * @param name
     *      department name or title
     * @param employee_id
     *      department head employee id
     */
    static async createDepartment(token: string, name: string, employee_id?: number){

        try{

            let request: any = {
                token: token,
                name: name,
            };

            if(employee_id){
                request["department_head"] = employee_id
            }

            return await Request("post", "/Department/create", request);

        }catch(error) {
            throw error;
        }

    }

    /**
     * edit existing department information
     * @param token
     *      signed in user authentication token
     * @param id
     *      department unique identifier
     * @param name
     *      department title or name
     * @param employee_id
     *      department head employee id
     */
    static async updateDepartment(token: string, id: number, name: string, employee_id: number){

        try{

            return await Request("post", "/Department/update", {
                token: token,
                department_name: name,
                department_head: employee_id,
                department_id: id
            });

        }catch(error) {
            throw error;
        }

    }

    /**
     * single department information
     * @param id
     *      department unique identifier
     */
    static async departmentDetail(id: number): Promise<DepartmentModel> {

        try{
            return await Request("get", "/Department/department_detail/"+id);
        }catch(error) {
            throw error;
        }

    }

}