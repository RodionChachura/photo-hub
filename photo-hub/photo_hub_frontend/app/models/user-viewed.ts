export class ViewedUser {
    Username: string;
    Url: string;

    constructor(url: string,
        username: string) {
        this.Username = username;
        this.Url = url;
    }
}