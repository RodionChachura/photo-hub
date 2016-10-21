import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { NotificationService } from '../services/notification.service'
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router,
        private notificationService : NotificationService) { }
 
    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page
        this.notificationService.printErrorMessage('At first you need to login')
        this.router.navigate(['/login']);
        return false;
    }
}