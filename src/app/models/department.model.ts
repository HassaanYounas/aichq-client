import { Program } from './program.model';

export class Department {
    ID: String;
    Name: String;
    DirectorName: String;
    Email: String;
    Programs: Program[];

    constructor(res: any) {
        this.ID = res.ID;
        this.DirectorName = res.DirectorName;
        this.Email = res.Email;
        this.Name = res.Name;
        this.Programs = new Array<Program>();
        if ('Programs' in res) {
            for (let i = 0; i < res.Programs.length; i++) {
                this.Programs.push(new Program(res.Programs[i]));
            }
        }
    }
}