export class Registration {
    Username: string;
    Password: string;
    ConfirmPassword: string;
    Email: string;

    constructor(username: string,
        password: string,
        confirmpassword: string,
        email: string) {
        this.Username = username;
        this.Password = password;
        this.ConfirmPassword = confirmpassword;
        this.Email = email;
    }
}