export class Admin {
    FullName: String;
    Email: String;
    Password: String;
    Department: String;

    constructor(res: any) {
        this.FullName = res.FullName;
        this.Email = res.Email;
        this.Department = res.Department;
    }
}