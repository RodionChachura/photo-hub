import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConfigService } from './config.service'
import { DataService } from './data.service'
import { ViewedUser } from '../models/user-viewed'
 
@Injectable()
export class UsersDataService extends DataService{
    private _viewedUser : ViewedUser;
    constructor(private _http: Http,
        private _configService: ConfigService) { 
        super(_http, _configService)
    }

        
    public getCurrentUserUrl(): string{
        if (localStorage.getItem('currentUser')){
            return this._configService.usersApiUrl + JSON.parse(localStorage.getItem('currentUser')).pk  + '/';
        }
        return null
    }

    public getCurrentUserUsername(): string{
        if (localStorage.getItem('currentUser'))
            return JSON.parse(localStorage.getItem('currentUser')).username;
        return null
    }

    setViewedUser(url){
        this.get(url)
            .subscribe(res =>
                this._viewedUser = new ViewedUser(url, res.username)
            )
    }
    
    getViewedUserUsername(){
        if(this._viewedUser !== null)
            return this._viewedUser.Username
        return null
    }

    getViewedUserUrl(){
        if(this._viewedUser !== null)
            return this._viewedUser.Url
        return null
    }
}