export class Student {
    Department: String;
    Program: String;
    Session: String;
    Year: String;
    FullName: String;
    RollNumber: String;
    Phase: Number;

    constructor(res: any) {
        this.Department = res.Department;
        this.Program = res.Program;
        this.Session = res.Session;
        this.Year = res.Year;
        this.FullName = res.FullName;
        this.RollNumber = res.RollNumber;
        this.Phase = res.Phase;
    }
}