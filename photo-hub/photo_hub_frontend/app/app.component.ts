import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'photohub',
  templateUrl: './app/app.component.html'
})
export class AppComponent {
    constructor() {}

    isUserLoggedIn(): boolean{
        return true;
    }

    getUserName(): string{
        return 'Account'
    }
 }