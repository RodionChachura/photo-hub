import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    public apiUrl: string = 'http://localhost:8000/api/';
    public loginApiUrl: string = this.apiUrl + 'login/';
    public registerApiUrl: string = this.apiUrl + 'register/';

    public usersApiUrl: string = this.apiUrl + 'users/';
    public albumsApiUrl: string = this.apiUrl + 'albums/';
    public photosApiUrl: string = this.apiUrl + 'photos/';


    constructor() { }

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
}