import { Program } from './program.model';
import { Supervisor } from './supervisor.model';

export class Department {
    Name: String;
    Programs: Program[];
    Supervisors: Supervisor[];

    constructor() {
        this.Programs = new Array<Program>();
        this.Supervisors = new Array<Supervisor>();
    }

    assignValues(res: any): void {
        this.Name = res.Name;
        if ('Programs' in res) {
            for (let i = 0; i < res.Programs.length; i++) {
                this.Programs.push(new Program(res.Programs[i].Title));
            }
        }
    }

    setBatches(res: any): void {      
        for (let i = 0; i < res.length; i++) {
            if (this.Name === res[i].Department) {
                for (let j = 0; j < this.Programs.length; j++) {
                    if (this.Programs[j].Title === res[i].Program) {
                        this.Programs[j].addBatch(res[i]);
                    }
                }
            }
        }
    }

    setSupervisors(res: any): void {
        for (let i = 0; i < res.length; i++) {
            if (this.Name === res[i].Department) {
                const supervisor = new Supervisor();
                supervisor.assignValues(res[i]);
                this.Supervisors.push(supervisor);
            }
        }
    }
}