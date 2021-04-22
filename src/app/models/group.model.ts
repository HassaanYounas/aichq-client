export class Group {
    Department: String;
    Program: String;
    Session: String;
    Year: String;
    Username: String;
    Password: String;
    SupervisorEmail: String;
    SupervisorName: String;
    ProjectTitle: String;
    StudentOne: Student;
    StudentTwo: Student; 

    constructor(res: any) {
        this.Department = res.Department;
        this.Program = res.Program;
        this.Session = res.Session;
        this.Year = res.Year;
        this.Username = res.Username;
        this.SupervisorEmail = res.SupervisorEmail;
        this.SupervisorName = res.SupervisorName;
        this.ProjectTitle = res.ProjectTitle;
        this.StudentOne = new Student(
            res.StudentOne.RollNumber
        );
        this.StudentTwo = new Student(
            res.StudentTwo.RollNumber
        );
    }
}

class Student {
    RollNumber: String;

    constructor(rollNumber: String) {
        this.RollNumber = rollNumber;
    }
}