
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 

import { IUser } from '../../models/user';
import { IPaginated } from '../../models/paginated'

import { DataService } from '../../services/data.service';
import { UtilityService } from '../../services/utility.service';
import { NotificationService } from '../../services/notification.service';
import { Paginated } from '../../shared/paginated' 

@Component({
    selector: 'albums',
    templateUrl: 'static/app/components/users/users.component.html'
})
export class UsersComponent  extends Paginated implements OnInit {
    private _users: IUser[];

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService : DataService,
        private utilityService: UtilityService,
        private notificationService: NotificationService)  {
            super(1, 10);
        }


    ngOnInit() {
        this.getUsers();
    }

    private getUsers() {
        this.dataService.getUsers(this._page, this._pageSize)
            .subscribe((paginated: IPaginated<IUser>) => {
                this._users = paginated.results;
                this._totalCount = paginated.count;
                this.calculatePagesCount();
            },
            error => {
                this.notificationService.printErrorMessage(error);
            });
    }

    search(i): void {
        super.search(i);
        this.getUsers();
    }

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}
