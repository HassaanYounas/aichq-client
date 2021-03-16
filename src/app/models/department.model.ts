import { Program } from './program.model';

export class Department {
    Name: String;
    Programs: Program[];

    constructor(res: any) {
        this.Name = res.Name;
        this.Programs = new Array<Program>();
        if ('Programs' in res) {
            for (let i = 0; i < res.Programs.length; i++) {
                this.Programs.push(new Program(res.Programs[i].Title));
            }
        }
    }
}