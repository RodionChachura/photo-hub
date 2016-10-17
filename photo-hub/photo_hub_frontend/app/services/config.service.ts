import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    public apiURI : string;
    public loginApiURI = this.apiURI + 'login/';
    public registerApiURI = this.apiURI + 'register/';
    public usersApiURI = this.apiURI + 'users/';
    
    constructor() {
        this.apiURI = 'http://localhost:8000/api/';
     }
}