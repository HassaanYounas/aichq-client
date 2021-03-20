export class SupervisorRequest {
    ProposalTitle: String;
    SupervisorEmail: String;
    GroupID: String;
    Session: String;
    Year: String;
    Program: String;
    StudentOneRollNumber: String;
    StudentTwoRollNumber: String;
    Accepted: Boolean;
    Rejected: Boolean;
    Timestamp: String;

    constructor(res: any) {
        this.ProposalTitle = res.ProposalTitle;
        this.SupervisorEmail = res.SupervisorEmail;
        this.GroupID = res.GroupID;
        this.Session = res.Session;
        this.Year = res.Year;
        this.Program = res.Program;
        this.StudentOneRollNumber = res.StudentOneRollNumber;
        this.StudentTwoRollNumber = res.StudentTwoRollNumber;
        this.Accepted = res.Accepted;
        this.Rejected = res.Rejected;
        this.Timestamp = res.Timestamp;
    }
}