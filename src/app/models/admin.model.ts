export class Admin {
    FullName: String;
    Username: String;
    Password: String;
    Department: String;

    constructor(res: any) {
        this.FullName = res.FullName;
        this.Username = res.Username;
        this.Department = res.Department;
    }
}