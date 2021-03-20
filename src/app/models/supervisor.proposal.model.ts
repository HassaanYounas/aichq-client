export class SupervisorProposal {
    id: String;
    Session: String;
	Year: String;
    Department: String;
	Program: String
	Domain: String;
    Title: String;
	Abstract: String;
	Email: String;

    constructor(res: any) {
        this.id = res.id;
        this.Session = res.Session;
        this.Year = res.Year;
        this.Department = res.Department;
        this.Program = res.Program;
        this.Domain = res.Domain;
        this.Title = res.Title;
        this.Abstract = res.Abstract;
        this.Email = res.Email;
    }
}