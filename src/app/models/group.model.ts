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
    Proposals: Proposal[];

    assignValues(res: any): void {
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
        this.Proposals = new Array<Proposal>();
        for (let i = 0; i < res.Proposals.length; i++) {
            this.Proposals[i] = new Proposal(
                res.Proposals[i].Domain,
                res.Proposals[i].Title,
                res.Proposals[i].Abstract,
                res.Proposals[i].SupervisorUsername
            );
        }
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

class Proposal {
    Domain: String;
    Title: String;
    Abstract: String;
    SupervisorUsername: String;

    constructor(domain: String, title: String, abstract: String, supervisorUsername: String) {
        this.Domain = domain;
        this.Title = title;
        this.Abstract = abstract;
        this.SupervisorUsername = supervisorUsername;
    }
}