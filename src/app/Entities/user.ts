
export class User {
    id: any;

    firstName: any;

    lastName: any;

    email: any;

    employeId: any;

    password: any;
    role:any;

    constructor( firstName: any, lastName: any, email: any, employeId: any, password: any,role:any) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.employeId = employeId;
        this.password = password;
        this.role=role;
    }
}
