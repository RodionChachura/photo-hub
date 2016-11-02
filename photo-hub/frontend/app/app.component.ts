import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from './services/data.service';

@Component({
  selector: 'photohub',
  templateUrl: 'static/app/app.component.html'
})
export class AppComponent implements OnInit {
    constructor(private router: Router,
        private dataService: DataService) {}
        
    private _userId: string;
    private _username: string;

    ngOnInit(){
        this._userId = this.dataService.getCurrentUserId();
    }

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