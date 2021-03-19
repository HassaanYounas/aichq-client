export class SuperAdmin {
    Username: String;
    Password: String;

    constructor(res: any) {
        this.Username = res.Username;
    }
}