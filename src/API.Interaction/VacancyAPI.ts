import {Request} from "./api";
import VacanciesModel from "../Models/VacanciesModel";
import DepartmentModel from "../Models/DepartmentModel";
import EmployeeModel from "../Models/EmployeeModel";

export default class VacancyAPI {

    /**
     * all list of vacancies available
     * @param position
     *      title of the position the vacancy is posted for
     * @param status
     *      state of vacancy if it's deadline is pass closed
     *      if it's deadline is in future open
     * @param department
     *      unique department identifier
     */
    static async getAll(position?: string, status?: ("open"|"closed"), department?: number): Promise<VacanciesModel[]>{

        try{

            let request: {
                position?: string,
                status?: ("open"|"closed"),
                department_id?: number
            }  = {};

            if(position){
                request["position"] = position;
            }

            if(status){
                request["status"] = status;
            }

            if(department){
                request["department_id"] = department;
            }

            return await Request("post", "/Vacancy/all", request);

        }catch(error) {
            throw error;
        }

    }

    /**
     * post new vacancy
     * @param token
     * @param employee_id
     *      employee who is trying to create this vacancy
     * @param vacancy_data
     *   contains the following information about the job opening
     //     position: any,
     //     salary: any,
     //     department_id: any,
     //     description: any,
     //     start_date: any,
     //     end_date: any,
     //     status: any
     */
    static async createVacancy(token: string, employee_id: number, vacancy_data: VacanciesModel){

        try{
            return await Request("post", "/Vacancy/post_vacancy", {
                ...vacancy_data,
                token: token,
                employee_id: employee_id
            });
        }catch(error) {
            throw error;
        }

    }

    static async updateVacancy(token: string, vacancy: VacanciesModel, employee_id: number, vacancy_id: number, status: string) {

        try{
            return await Request("post", "/Vacancy/update_vacancy", {
                ...vacancy,
                token: token,
                employee_id: employee_id,
                vacancy_id: vacancy_id,
                status: status
            });
        }catch(error) {
            throw error;
        }

    }

    static async vacancyDetail(vacancy_id: number): Promise<{
        detail: VacanciesModel,
        department: DepartmentModel,
        updated_by: EmployeeModel
    }>
    {
        try{
            return await Request("get", "/Vacancy/vacancy_detail/"+vacancy_id);
        }catch(error) {
            throw error;
        }
    }

};