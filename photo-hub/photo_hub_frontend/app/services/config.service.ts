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

    public getUserAlbumsUrl(url: string): string{
        return url + 'albums/'
    }

    public getUserPhotosUrl(url: string): string{
        return url + 'photos/'
    }
}