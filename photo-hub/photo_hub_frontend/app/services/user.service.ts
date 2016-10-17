import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConfigService } from './config.service'
 
@Injectable()
export class UserService {
    constructor(private configService: ConfigService, 
                private http: Http) { }
 
    getAll() {
        return this.http.get(this.configService.usersApiURI, this.jwt()).map((response: Response) => response.json());
    }
 
    getById(id) {
        return this.http.get(this.configService.usersApiURI + id, this.jwt()).map((response: Response) => response.json());
    }
    // doesn't have realization on backend side
    create(registration) {
        return this.http.post(this.configService.registerApiURI, registration, this.jwt()).map((response: Response) => response.json());
    }
 
    update(user) {
        return this.http.put(this.configService.usersApiURI + user.id, user, this.jwt()).map((response: Response) => response.json());
    }
 
    delete(id) {
        return this.http.delete(this.configService.usersApiURI + id, this.jwt()).map((response: Response) => response.json());
    }
 
    // private helper methods
 
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}