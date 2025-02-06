export interface User {
    id?: number;
    firsname?: string;
    lastname?: string;
    username: string;
    email: string;
    phone?: string;
    address?: string;
    password?: string;
}

export interface UserAuth {
    login?: string;
    password: string;
}