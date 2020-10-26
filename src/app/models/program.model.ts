export class Program {
    Title: String;
    Batches: Batch[];

    constructor(title: String) {
        this.Title = title;
        this.Batches = new Array<Batch>();
    }

    addBatch(res: any): void {
        this.Batches.push(new Batch(res.Archived, res.Session, res.Year));
    }
}

class Batch {
    Archived: Boolean;
    BatchID: String;

    constructor(archived: Boolean, session: String, year: String) {
        this.Archived = archived;
        this.BatchID = `${session}-${year}`;
    }
}