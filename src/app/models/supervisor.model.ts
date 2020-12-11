export class Supervisor {
    Active: Boolean;
	FullName: String;
	Email: String;
	Password: String;
    Department: String;
    Designation: String;

    constructor(res: any) {
        this.Active = true;
        this.Active = res.Active;
        this.FullName = res.FullName;
        this.Email = res.Email;
        this.Department = res.Department;
        this.Designation = res.Designation;
    }
}