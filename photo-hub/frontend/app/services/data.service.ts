import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UtilityService } from './utility.service'
import { NotificationService } from './notification.service'

import { IUser } from '../models/user'
import { IAlbum } from '../models/album'
import { IAlbumDetail } from '../models/album-detail'
import { IPhoto } from '../models/photo'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class DataService {
    public apiUri = 'http://localhost:8000/api/';

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
                return res.json();
            })
            .catch(this.handleError);
    }

    createAlbum(title: string): Observable<IAlbum>{
        let json = JSON.stringify({ title: title});
        return this.http.post(this.apiUri + 'albums/', json, this.headers())
            .map((res: Response) => {
                return res.json();
            })
        .catch(this.handleError);
    }

    deleteAlbum(id: number): Observable<void> {
        return this.http.delete(this.apiUri + 'albums/' + id + '/', this.headers())
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);  
    }

    getUserAlbums(userId): Observable<IAlbum[]>{
        return this.http.get(this.apiUri + 'albums/' + '?user_id=' + userId, this.headers())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    getAlbumPhotos(albumId): Observable<IPhoto[]>{
        return this.http.get(this.apiUri + 'photos/' + '?album_id=' + albumId, this.headers())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    getAlbum(id): Observable<IAlbumDetail>{
        return this.http.get(this.apiUri + 'albums/' + id + '/', this.headers())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    getUserPhotos(userId): Observable<IPhoto[]>{
        return this.http.get(this.apiUri + 'photos/' + '?user_id=' + userId, this.headers())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    getPhoto(id): Observable<IPhoto>{
       return this.http.get(this.apiUri + 'photos/' + id + '/', this.headers())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    uploadPhotoToAlbum(image: any, title: string, albumId: number): Observable<void>{
        let input = new FormData();
        input.append("image", image);
        input.append("title", title);
        input.append("albumId", albumId);
        return this.http.post(this.apiUri + 'photos/', input, this.headers(true))
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    uploadPhoto(image: any, title: string): Observable<void>{
        let input = new FormData();
        input.append("image", image);
        input.append("title", title);
        return this.http.post(this.apiUri + 'photos/', input, this.headers(true))
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    deletePhoto(id: number): Observable<void> {
        return this.http.delete(this.apiUri + 'photos/' + id + '/', this.headers())
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);  
    }
    
    private handleError(error: any) {
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
 
    private headers(formdata=false) {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            if (formdata)
                var headers = new Headers({ 'Authorization': 'JWT ' + currentUser.token});
            else
                var headers = new Headers({ 'Authorization': 'JWT ' + currentUser.token, 'Content-Type': 'application/json'});
            return new RequestOptions({ headers: headers }); 
        }
    }
}