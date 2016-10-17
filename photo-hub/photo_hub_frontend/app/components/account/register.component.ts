import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router'

import { Registration } from '../../models/registration';

import { UserService } from '../../services/user.service'
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'register',
    providers: [UserService, NotificationService],
    templateUrl: './app/components/account/register.component.html',
})
export class RegisterComponent implements OnInit {
    private _newUser: Registration;

    constructor(public userService: UserService,
                public notificationService: NotificationService,
                public router: Router) { }

    ngOnInit() {
        this._newUser = new Registration('', '', '', '');
    }

    register(): void {
        console.log("Register clicked!")
        this.userService.create(this._newUser)
            .subscribe(data => {
                console.log("Registration result:" + data);
                this.notificationService.printSuccessMessage('Dear ' + this._newUser.Username + ', please login with your credentials');
                this.router.navigate(['account/login']);
            },
            error =>
            { 
                console.error('Error: ' + error);
                this.notificationService.printErrorMessage(error);
            });
    };

    back() {
        this.router.navigate(['/']);
    }

}