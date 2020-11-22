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
    }

    assignValues(res: any): void {
        this.Active = res.Active;
        this.FullName = res.FullName;
        this.Email = res.Email;
        this.Department = res.Department;
        this.Designation = res.Designation;
    }
}

class Proposal {
    Domain: String;
    Title: String;
    Abstract: String;

    constructor(domain: String, title: String, abstract: String) {
        this.Domain = domain;
        this.Title = title;
        this.Abstract = abstract;
    }
}