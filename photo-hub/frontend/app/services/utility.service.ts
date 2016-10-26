import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service'

@Injectable()
export class UtilityService {

    private _router: Router;

    constructor(router: Router,
        private notificationService: NotificationService) {
        this._router = router;
    }

    convertDateTime(date: Date) {
        var _formattedDate = new Date(date.toString());
        return _formattedDate.toDateString();
    }

    navigate(path: string) {
        this._router.navigate([path]);
    }

    pageNotFound(){
        this._router.navigate(['/']);
        this.notificationService.printErrorMessage('Page does not exists')
    }

    removeUser()
    {
        localStorage.removeItem('currentUser');
        this.notificationService.printErrorMessage('You tried to access disabled resources. Please repeate authentication')
        this.navigateToSignIn();
    }

    navigateToSignIn() {
        this.navigate('/login');
    }
}