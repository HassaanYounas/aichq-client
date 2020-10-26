export class Batch {
    Archived: Boolean;
    Session: String;
	Year: String;
    Department: String;
	Program: String;

    constructor() {
        this.Archived = false;
        this.Session = '';
        this.Year = '';
        this.Department= '';
        this.Program = '';
    }

    assignValues(res: any): void {
        this.Archived = res.Archived;
        this.Session = res.Session;
        this.Year = res.Year;
        this.Department = res.Department;
        this.Program = res.Program;
    }
}