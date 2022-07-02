export default interface VacanciesModel {
    id: number,
    position: string,
    salary: number,
    description: string,
    start_date: string,
    end_date: string,
    status: string,
    updated_by: number,
    department_id: number
}