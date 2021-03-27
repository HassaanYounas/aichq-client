export class Batch {
    Archived: Boolean;
    Session: String;
	Year: String;
    Department: String;
	Program: String;
    MaxGroups: Number;

    constructor(res: any) {
        this.Archived = res.Archived;
        this.Session = res.Session;
        this.Year = res.Year;
        this.Department = res.Department;
        this.Program = res.Program;
        this.MaxGroups = res.MaxGroups;
    }
}