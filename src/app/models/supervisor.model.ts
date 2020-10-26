export class Supervisor {
    Active: Boolean;
	FullName: String;
	Email: String;
	Password: String;
    Department: String;
    Designation: String;
    Proposals: Proposal[];

    constructor() {
        this.Active = true;
        this.FullName = '';
        this.Email = '';
        this.Password = '';
        this.Department = '';
        this.Designation = '';
    }

    assignValues(res: any): void {
        this.Active = res.Active;
        this.FullName = res.FullName;
        this.Email = res.Email;
        this.Department = res.Department;
        this.Designation = res.Designation;
    }
}

export class Proposal {
    Domain: String;
    Title: String;
    Abstract: String;

    constructor(domain: String, title: String, abstract: String) {
        this.Domain = domain;
        this.Title = title;
        this.Abstract = abstract;
    }
}