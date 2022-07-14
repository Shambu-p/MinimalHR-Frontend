
export default interface Account {
    employee_id: number,
    email: string,
    status: string,
    is_admin: number,
    password?: string,
    recovery_toke?: string
};