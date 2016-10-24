import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConfigService } from './config.service'
import { UtilityService } from './utility.service'
import { NotificationService } from './notification.service'
import { DataService } from './data.service'
import { User } from '../models/user'
 
@Injectable()
export class UsersService extends DataService{
    constructor(private _http: Http,
        private _utilityService: UtilityService,
        private _notificationService: NotificationService,
        private _configService: ConfigService) { 
        super(_http, _utilityService, _notificationService, _configService);
    }

    getUsers(): Array<User>{
        let users = new Array<User>();
        this.get(this._configService.usersApiUrl)
            .subscribe(res =>
                res.forEach(element => {
                    users.push(new User(element.id, element.username))
                },
                error =>{
                    if(error.status == 403)
                        this._utilityService.removeUser();
                    else
                        this._utilityService.pageNotFound();
                }
                )
            )
        return users;
    }

}