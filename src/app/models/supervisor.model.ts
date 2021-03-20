import { SupervisorProposal } from "./supervisor.proposal.model";

export class Supervisor {
    Active: Boolean;
	FullName: String;
	Email: String;
	Password: String;
    Department: String;
    Designation: String;
    Proposals: SupervisorProposal[];

    constructor(res: any) {
        this.Active = res.Active;
        this.FullName = res.FullName;
        this.Email = res.Email;
        this.Department = res.Department;
        this.Designation = res.Designation;
    }

    setProposals(proposals: SupervisorProposal[]) {
        this.Proposals = new Array<SupervisorProposal>();
        proposals.forEach(e => {
            if (e.Email === this.Email) this.Proposals.push(new SupervisorProposal(e));
        });
    }
}