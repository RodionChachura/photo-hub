
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 

import { User } from '../../models/user';

import { UsersService } from '../../services/users.service';
import { ConfigService } from '../../services/config.service';
import { UtilityService } from '../../services/utility.service';

@Component({
    selector: 'albums',
    templateUrl: 'static/app/components/users/users.component.html'
})
export class UsersComponent implements OnInit {
    private _users: Array<User>;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private configService: ConfigService,
        private usersService : UsersService,
        private utilityService: UtilityService) {}


    ngOnInit() {
        this._users = this.usersService.getUsers();
    }

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }

    saveSelected(user: User) {
        this.configService.selectedUser = user;
    }
}
