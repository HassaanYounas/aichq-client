export class Supervisor {
    FullName: String;
    Username: String;

    constructor() {
        this.FullName = '';
        this.Username = '';
    }

    assignValues(res: any): void {
        this.FullName = res.FullName;
        this.Username = res.Username;
    }
}