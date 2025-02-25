export class UserRequest {
    id?: number;
    firsname?: string;
    lastname?: string;
    username: string;
    email: string;
    phone?: string;
    address?: string;
    password?: string;

    constructor(username: string, email: string, id?: number, firsname?: string, lastname?: string, phone?: string, address?: string, password?: string) {
        this.id = id;
        this.firsname = firsname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.password = password;
    }
}