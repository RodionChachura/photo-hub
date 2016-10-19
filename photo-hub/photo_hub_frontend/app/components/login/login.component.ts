import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Login } from '../../models/login';

import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../services/notification.service';


@Component({
    selector: 'login',
    templateUrl: './app/components/login/login.component.html',
})
export class LoginComponent implements OnInit {
    private _user: Login;

    constructor(public authenticationService: AuthenticationService,
                public notificationService: NotificationService,
                public router: Router) { }

    ngOnInit() {
        this._user = new Login('', '');
    }

    login(): void {
        this.authenticationService.login(this._user.UsernameOrEmail, this._user.Password)
            .subscribe(data => {
                this.router.navigate(['/']);
                this.notificationService.printSuccessMessage('Welcome back ' + JSON.parse(localStorage.getItem('currentUser')).username + '!');
            },
            error => 
            {
                console.log('Error: ' + error)
                this.notificationService.printErrorMessage('Invalid password or username');
            })
    };
}