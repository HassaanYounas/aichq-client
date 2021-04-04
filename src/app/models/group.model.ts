export class Group {
    Department: String;
    Program: String;
    Session: String;
    Year: String;
    TeamName: String;
    Username: String;
    Password: String;
    ProjectID: Number;
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
        this.ProjectTitle = res.ProjectTitle;
        if ('TeamName' in res) this.TeamName = res.TeamName;
        if ('ProjectID' in res) this.ProjectID = res.ProjectID;
        this.StudentOne = new Student(
            res.StudentOne.RollNumber
            // res.StudentOne.Contact,
            // res.StudentOne.CGPA
        );
        this.StudentTwo = new Student(
            res.StudentTwo.RollNumber
            // res.StudentTwo.Contact,
            // res.StudentTwo.CGPA
        );
    }
}

class Student {
    RollNumber: String;
    // Contact: String;
    // CGPA: String;

    constructor(rollNumber: String) {
        this.RollNumber = rollNumber;
    }

    // constructor(rollNumber: String, contact: String, cgpa: String) {
    //     this.RollNumber = rollNumber;
    //     this.Contact = contact;
    //     this.CGPA = cgpa;
    // }
}