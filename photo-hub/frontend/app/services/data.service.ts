import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UtilityService } from './utility.service'
import { NotificationService } from './notification.service'

import { IUser } from '../models/user'
import { IAlbum } from '../models/album'
import { IAlbumDetail } from '../models/album-detail'
import { IAlbumForSelection } from '../models/album-selection'
import { IPhoto } from '../models/photo'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class DataService {

    constructor(private http: Http,
        private utilityService: UtilityService,
        private notificationService: NotificationService) { }

    //from local storage
    getCurrentUserUsername(){
        if (localStorage.getItem('currentUser'))
            return JSON.parse(localStorage.getItem('currentUser')).username;
        return ''
    }

    getCurrentUserId(){
        if (localStorage.getItem('currentUser'))
            return JSON.parse(localStorage.getItem('currentUser')).id;
        return ''
    }

    // GET 
    getUsers(): Observable<IUser[]>{
        return this.http.get('api/users', this.headers())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }
    
    getUserAlbums(userId): Observable<IAlbum[]>{
        return this.http.get('api/albums' + '?user_id=' + userId, this.headers())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    getUserAlbumsForSelection(userId): Observable<IAlbumForSelection[]>{
        return this.http.get('api/albums' + '?user_id=' + userId, this.headers())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    getUserPhotos(userId): Observable<IPhoto[]>{
        return this.http.get('api/photos' + '?user_id=' + userId, this.headers())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    // GET /id
    getAlbum(id): Observable<IAlbumDetail>{
        return this.http.get('api/albums/' + id, this.headers())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    getPhoto(id): Observable<IPhoto>{
       return this.http.get('api/photos/' + id, this.headers())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    // CREATE 
    createAlbum(title: string, _private: boolean): Observable<IAlbum>{
        let json = JSON.stringify({ title: title, private: _private});
        return this.http.post('api/albums', json, this.headers())
            .map((res: Response) => {
                return res.json();
            })
        .catch(this.handleError);
    }

    createPhoto(image: any, title: string, albumId?: number): Observable<void>{
        let input = new FormData();
        input.append("image", image);
        input.append("title", title);
        input.append("albumId", albumId);
        return this.http.post('api/photos', input, this.headers(true))
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    createLike(photoId: number): Observable<void>{
        let json = JSON.stringify({userId: this.getCurrentUserId()});
        return this.http.post('api/photos/' + photoId + '/set_like', json, this.headers())
            .map((res: Response) => {
                return res;
            })
        .catch(this.handleError);
    }

    // DELETE
    deleteAlbum(id: number): Observable<void> {
        return this.http.delete('api/albums/' + id, this.headers())
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);  
    }

    deletePhoto(id: number): Observable<void> {
        return this.http.delete('api/photos/' + id, this.headers())
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);  
    }

    // UPDATE
    
    updateAlbum(id: number, title: string): Observable<void>{
        let json = JSON.stringify({id: id, title: title});
        return this.http.patch('api/albums/' + id, json, this.headers())
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);  
    }
    
    updatePhoto(id: number, title: string, albumId: number) {
        var json =  JSON.stringify({title: title, albumId: albumId});
        return this.http.patch('api/photos/' + id, json, this.headers())
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
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }

        // if status unauthorized => logout
        if (error.status == 401){
            localStorage.removeItem('currentUser');
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