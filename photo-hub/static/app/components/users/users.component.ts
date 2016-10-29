
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 

import { IUser } from '../../models/user';

import { DataService } from '../../services/data.service';
import { UtilityService } from '../../services/utility.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'albums',
    templateUrl: 'static/app/components/users/users.component.html'
})
export class UsersComponent implements OnInit {
    private users: IUser[];

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService : DataService,
        private utilityService: UtilityService,
        private notificationService: NotificationService) {}


    ngOnInit() {
        this.dataService.getUsers()
            .subscribe((users: IUser[]) => {
                this.users = users;
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load users. ' + error);
            });
    }

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}
