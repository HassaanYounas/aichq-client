export class Program {
    Title: String;
    NumberOfBatches: Number;
    NumberOfStudents: Number;

    constructor(res: any) {
        this.Title = res.Title;
        this.NumberOfBatches = 0;
        this.NumberOfStudents = 0;
    }
}