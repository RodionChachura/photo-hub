import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    public apiURI : string = 'http://localhost:8000/api/';
    public loginApiURI = this.apiURI + 'login/';
    public registerApiURI = this.apiURI + 'register/';

    public usersApiURI = this.apiURI + 'users/';
    public albumsApiURI = this.apiURI + 'albums/';
    public photosApiURI = this.apiURI + 'photos/';
        
    
    constructor() {}
}