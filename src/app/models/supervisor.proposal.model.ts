export class SupervisorProposal {
    BatchID: String;
    id: String;
    Session: String;
	Year: String;
	Program: String
	Domain: String;
    Title: String;
	Abstract: String;
	Email: String;
	Approved: Number;

    constructor(res: any) {
        this.BatchID = res.BatchID;
        this.id = res.id;
        this.Program = this.BatchID.split('-')[0];
        this.Session = this.BatchID.split('-')[1];
        this.Year = this.BatchID.split('-')[2];
        this.Domain = res.Domain;
        this.Title = res.Title;
        this.Abstract = res.Abstract;
        this.Email = res.Email;
        this.Approved = res.Approved;
    }
}