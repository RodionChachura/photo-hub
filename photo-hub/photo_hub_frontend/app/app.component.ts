import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'photohub',
  templateUrl: './app/app.component.html'
})
export class AppComponent {
    constructor() {}

    isUserLoggedIn(): boolean{
        if(localStorage.getItem('currentUser'))
            return true;
        return false;
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