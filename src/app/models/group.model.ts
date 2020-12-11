export class Group {
    Department: String;
    Program: String;
    Session: String;
    Year: String;
    TeamName: String;
    Username: String;
    Password: String;
    ProjectID: Number;
    StudentOne: Student;
    StudentTwo: Student;

    constructor(res: any) {
        this.Department = res.Department;
        this.Program = res.Program;
        this.Session = res.Session;
        this.Year = res.Year;
        this.TeamName = res.TeamName;
        this.Username = res.Username;
        this.ProjectID = res.ProjectID;
        this.StudentOne = new Student(
            res.StudentOne.RollNumber,
            res.StudentOne.Contact,
            res.StudentOne.CGPA
        );
        this.StudentTwo = new Student(
            res.StudentTwo.RollNumber,
            res.StudentTwo.Contact,
            res.StudentTwo.CGPA
        );
    }
}

class Student {
    RollNumber: String;
    Contact: String;
    CGPA: String;

    constructor(rollNumber: String, contact: String, cgpa: String) {
        this.RollNumber = rollNumber;
        this.Contact = contact;
        this.CGPA = cgpa;
    }
}