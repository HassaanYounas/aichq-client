export class SupervisorRequest {
    ID: String;
    Department: String;
    SupervisorName: String;
    ProposalTitle: String;
    SupervisorEmail: String;
    GroupID: String;
    Session: String;
    Year: String;
    Program: String;
    StudentOneRollNumber: String;
    StudentTwoRollNumber: String;
    Accepted: Number;
    Timestamp: String;

    constructor(res: any) {
        this.ID = res._id;
        this.Department = res.Department;
        this.SupervisorName = res.SupervisorName;
        this.ProposalTitle = res.ProposalTitle;
        this.SupervisorEmail = res.SupervisorEmail;
        this.GroupID = res.GroupID;
        this.Session = res.Session;
        this.Year = res.Year;
        this.Program = res.Program;
        this.StudentOneRollNumber = res.StudentOneRollNumber;
        this.StudentTwoRollNumber = res.StudentTwoRollNumber;
        this.Accepted = res.Accepted;
        this.Timestamp = res.Timestamp;
    }
}