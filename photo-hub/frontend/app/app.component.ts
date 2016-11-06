import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'photohub',
  templateUrl: 'static/app/app.component.html'
})
export class AppComponent {
    constructor(private router: Router) {}

    isUserLoggedIn(): boolean{
        if(localStorage.getItem('currentUser'))
            return true;
        return false;
    }

    getUserId(): string{
        if (localStorage.getItem('currentUser'))
            return JSON.parse(localStorage.getItem('currentUser')).id;
    }

    getUserName(): string{
        if (localStorage.getItem('currentUser'))
            return JSON.parse(localStorage.getItem('currentUser')).username;
        return 'Account'
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
 }