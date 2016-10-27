import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UtilityService } from './utility.service'
import { NotificationService } from './notification.service'

import { IUser } from '../models/user'
import { IAlbum } from '../models/album'
import { IPhoto } from '../models/photo'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class DataService {
    public apiUri = 'http://localhost:8000/api/';
    public selectedUser: IUser;
    public selectedAlbum: IAlbum;

    constructor(private http: Http,
        private utilityService: UtilityService,
        private notificationService: NotificationService) { }


    public getCurrentUserId(){
        if (localStorage.getItem('currentUser'))
            return JSON.parse(localStorage.getItem('currentUser')).id;
        return ''
    }

    public getCurrentUserUsername(){
        if (localStorage.getItem('currentUser'))
            return JSON.parse(localStorage.getItem('currentUser')).username;
        return ''
    }

    getUsers(): Observable<IUser[]>{
        return this.http.get(this.apiUri + 'users/', this.headers())
            .map((res: Response) => {
                console.log(res);
                return res.json();
            })
            //.catch(this.handleError);
    }

    createAlbum(title: string): Observable<IAlbum>{
        let json = JSON.stringify({ title: title});
        console.log(json)
        return this.http.post(this.apiUri + 'albums/', json, this.headers())
            .map((res: Response) => {
                console.log(res);
                return res.json();
            })
        //.catch(this.handleError);
    }

    getUserAlbums(userId): Observable<IAlbum[]>{
        return this.http.get(this.apiUri + 'albums/' + '?user_id=' + userId, this.headers())
            .map((res: Response) => {
                console.log(res);
                return res.json();
            })
            //.catch(this.handleError);
    }

    getAlbumPhotos(albumId): Observable<IPhoto[]>{
        return this.http.get(this.apiUri + 'photos/' + '?album_id=' + albumId, this.headers())
            .map((res: Response) => {
                console.log(res);
                return res.json();
            })
            //.catch(this.handleError);
    }

    getAlbum(id): Observable<IAlbum>{
        return this.http.get(this.apiUri + 'albums/' + id + '/', this.headers())
            .map((res: Response) => {
                console.log(res);
                return res.json();
            })
            //.catch(this.handleError);
    }

    getUserPhotos(userId): Observable<IPhoto[]>{
        return this.http.get(this.apiUri + 'photos/' + '?user_id=' + userId, this.headers())
            .map((res: Response) => {
                console.log(res);
                return res.json();
            })
            //.catch(this.handleError);
    }

    getPhoto(id): Observable<IPhoto>{
       return this.http.get(this.apiUri + 'photos/' + id + '/', this.headers())
            .map((res: Response) => {
                console.log(res);
                return res.json();
            })
            //.catch(this.handleError);
    }

    private handleError(error: any) {
        console.log(error);
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors: string = '';

        if (!serverError.type) {
            console.log(serverError);
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

        return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }
 
    private headers() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'JWT ' + currentUser.token, 'Content-Type': 'application/json'});
            return new RequestOptions({ headers: headers });
        }
    }
}