import {Request} from "./api";
import EmployeeModel from "../Models/EmployeeModel";
import Account from "../Models/Account";
import AddressModel from "../Models/AddressModel";
import EventDate from "../Models/EventDate";
import DepartmentModel from "../Models/DepartmentModel";


export default class UserAPI {

    static async getAll(token: string): Promise<EmployeeModel[]>{

        try{
            return await Request("post", "/Employees/employee_list", {token: token})
        }catch(error) {
            throw error;
        }

    }

    /**
     * single employee detail information
     * @param token
     * @param id
     *      employee id number
     */
    static async employeeDetail(token: string, id: number): Promise<{
        account: Account,
        address: AddressModel[],
        event_date: EventDate,
        detail: EmployeeModel
    }>
    {

        try{
            return await Request("post", "Employees/employee_detail", {
                token: token,
                employee_id: id
            });
        }catch(error) {
            throw error;
        }

    }

    static async vacancyApplicant(token: string, salary: number, position: string, department_id: number): Promise<EmployeeModel[]> {
        try{
            return await Request("post", "/Employees/application_list", {
                token: token,
                salary: salary,
                position: position,
                department_id: department_id
            });
        }catch(error) {
            throw error;
        }
    }

    static async updateProfilePicture(token: string, image: any){
        try{
            await Request("post", "Employees/change_profile_picture", {
                token: token,
                profile_picture: image
            });
        }catch(error) {
            throw error;
        }
    }

    static async updateApplicationStatus(token: string, application_id: number, state: string){
        try{
            await Request("post", "/Employees/change_application_status", {
                token: token,
                application_id: application_id,
                status: state
            });
        }catch(error) {
            throw error;
        }
    }

    static async updateAccountStatus(token: string, id: number, state: string) {
        try{
            return await Request("post", "/Employee/change_status", {
                token: token,
                employee_id: id,
                status: state
            });
        }catch(error) {
            throw error;
        }
    }

    /**
     * single application detail information
     * @param id
     *      application number
     */
    static async checkApplication(id: number): Promise<{
        address: AddressModel[],
        department: DepartmentModel,
        detail: EmployeeModel
    }>
    {
        try{
            return await Request("get", "/Employees/check_application/" + id);
        }catch(error) {
            throw error;
        }
    }

    static async addAddress(token: string, address: AddressModel, employee_id: number){

        try{
            return await Request("post", "/Employees/add_address", {
                ...address,
                token: token,
                employee_id: employee_id
            });
        }catch(error) {
            throw error;
        }

    }

    static async deleteAddress(token: string, address_id: number, employee_id: number){
        try{
            return await Request("post", "/Employees/delete_address", {
                token: token,
                id: address_id,
                employee_id: employee_id
            });
        }catch(error) {
            throw error;
        }
    }

    /**
     * change address information
     * @param token
     * @param address
     * @param employee_id
     * @param id
     *      single address unique identifier
     */
    static async updateAddress(token: string, address: AddressModel, employee_id: number, id: number) {

        try{
            return await Request("post", "/Employees/edit_address", {
                ...address,
                token: token,
                employee_id: employee_id,
                id: id
            });
        }catch(error) {
            throw error;
        }

    }

    static async change_password(token: string, old_password: string, new_password: string, confirm_password: string) {

        try{
            return await Request("post", "/Employees/change_password", {
                token: token,
                old_password: old_password,
                new_password: new_password,
                confirm_password: confirm_password
            });
        }catch(error) {
            throw error;
        }

    }

    static getAllUserAddress(){
        //todo: all user address
    }

    /**
     * create new employee account
     * @param token
     * @param employee_data
     *   contains the following
     *      profile_picture: any,
     //     full_name: string,
     //     email: string,
     //     phone_number: string,
     //     documents: any,
     //     department_id: number,
     //     education_level: string,
     //     salary: number,
     //     position: string
     * @param address
     *      json string converted from list of address model
     */
    static async newEmployee(token: string, employee_data: EmployeeModel, address: string){

        try{

            return await Request("post", "/Employees/register_employee", {
                token: token,
                ...employee_data,
                address: address
            });

        }catch(error) {
            throw error;
        }

    }

    static async applyForVacancy(applicant: EmployeeModel, address: string, vacancy_id: number){

        try{

            return await Request("post", "/Employees/apply_for_vacancy", {
                ...applicant,
                vacancy_id: vacancy_id,
                address: address
            })

        }catch(error) {
            throw error;
        }

    }

    static async recoverPassword(employee_id: number, verification_code: string, new_password: string, confirm_password: string){

        try{

            return await Request("post", "/Employees/recover_password", {
                employee_id: employee_id,
                verification_code: verification_code,
                new_password: new_password,
                confirm_password: confirm_password
            });

        }catch(error) {
            throw error;
        }

    }

    static async verifyUser(employee_id: number, verification_code: string){

        try{

            return await Request("post", "/Employees/verify_user", {
                employee_id: employee_id,
                verification_code: verification_code
            });

        }catch(error) {
            throw error;
        }

    }

    static async findAccount(email: string){

        try{
            return await Request("post", "/Employees/forgot_password", {email: email});
        }catch(error) {
            throw error;
        }

    }

}