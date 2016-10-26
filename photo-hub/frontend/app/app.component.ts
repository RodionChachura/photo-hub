import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from './services/config.service'

@Component({
  selector: 'photohub',
  templateUrl: 'static/app/app.component.html'
})
export class AppComponent {
    constructor(private configService : ConfigService,
        private router: Router) {}

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