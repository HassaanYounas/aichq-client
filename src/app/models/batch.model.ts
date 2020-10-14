export class Batch {
    Year: Number;
    Program: String;
    Phase: Number;
    Supervisors: Supervisor[];
    Students: Student[];

    constructor() {
        this.Year = 0;
        this.Program = '';
        this.Phase = 1;
        this.Supervisors = new Array<Supervisor>();
        this.Students = new Array<Student>();
    }

    assignValues(res: any): void {
        this.Year = res.Year;
        this.Program = res.Program;
        this.Phase = res.Phase;
        if ('Supervisors' in res) {
            for (let i = 0; i < res.Supervisors.length; i++) {
                this.Supervisors.push({
                    Username: res.Supervisors[i].Username,
                    Proposals: new Array<Proposal>()
                });
            }
        }
        if ('Students' in res) {
            for (let i = 0; i < res.Students.length; i++) {
                this.Students.push({
                    RollNumber: res.Students[i].RollNumber
                });
            }
        }
    }
}

class Supervisor {
    Username: String;
    Proposals: Proposal[]

    constructor() {
        this.Username = '';
        this.Proposals = new Array<Proposal>();
    }
}

class Proposal {
    Domain: String;
    Title: String;
    Abstract: String;

    constructor() {
        this.Domain = '';
        this.Title = '';
        this.Abstract = '';
    }
}

class Student {
    RollNumber: Number;

    constructor() {
        this.RollNumber = 0;
    }
}