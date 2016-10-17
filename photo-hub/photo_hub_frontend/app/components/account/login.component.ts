import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';

import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../services/notification.service';


@Component({
    selector: 'login',
    templateUrl: './app/components/account/login.component.html',
})
export class LoginComponent implements OnInit {
    private _user: User;

    constructor(public authenticationService: AuthenticationService,
                public notificationService: NotificationService,
                public router: Router) { }

    ngOnInit() {
        this._user = new User('', '', '');
    }

    login(): void {
        console.log("athentication start")
        this.authenticationService.login(this._user.Username, this._user.Password)
            .subscribe(data => {
                this.router.navigate(['/']);
                this.notificationService.printSuccessMessage('Welcome back ' + this._user.Username + '!');
            },
            error => 
            {
                console.log('Error: ' + error)
                this.notificationService.printErrorMessage(error);
            })
        console.log("athentication ended")
    };

    back() {
        this.router.navigate(['/']);
    }
}