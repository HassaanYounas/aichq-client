export class Admin {
    FullName: String;
    Username: String;
    Password: String;

    constructor(res: any) {
        this.FullName = res.FullName;
        this.Username = res.Username;
    }
}