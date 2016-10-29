export class Registration {
    Username: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;

    constructor(username: string,
        email: string,
        confirmPassword,
        password: string) {
        this.Username = username;
        this.Email = email;
        this.Password = password;
        this.ConfirmPassword = confirmPassword;
    }
}