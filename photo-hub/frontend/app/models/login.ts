export class Login {
    UsernameOrEmail: string;
    Password: string;

    constructor(usernameOrEmail: string,
        password: string) {
        this.UsernameOrEmail = usernameOrEmail;
        this.Password = password;
    }
}