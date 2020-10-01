export class Batch {
    Year: Number;
    Program: String;
    Phase: Number;
    Supervisors: [{
        Username: String,
        Proposals: [{
            Domain: String,
            Title: String,
            Abstract: String,
        }]
    }];
    Students: [{ RollNumber: Number }];

    constructor() {
        this.Year = 0;
        this.Program = '';
        this.Phase = 1;
    }

    assignValues(res: any): void {
        this.Year = res.Year;
        this.Program = res.Program;
        this.Phase = res.Phase;
        // if (res.Supervisors.length !== 0) {
            
        // }
        // if (res.Students.lenth !== 0) {
        //     res.Students.forEach(e => {
        //         this.Students.push(e);
        //     });
        // }
    }
}