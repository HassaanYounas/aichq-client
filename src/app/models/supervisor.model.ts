export class Supervisor {
    FullName: String;
    Username: String;
    Password: String;

    constructor() {
        this.FullName = '';
        this.Username = '';
        this.Password = '';
    }

    assignValues(res: any): void {
        this.FullName = res.FullName;
        this.Username = res.Username;
    }
}