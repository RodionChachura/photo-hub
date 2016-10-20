import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConfigService } from './config.service'
 
@Injectable()
export class UserService {
    constructor(private configService: ConfigService, 
                private http: Http) { }
 
    getAllUsers() {
        return this.http.get(this.configService.usersApiURI, this.jwt()).map((response: Response) => response.json());
    }
 
    getById(id) {
        return this.http.get(this.configService.usersApiURI + id, this.jwt()).map((response: Response) => response.json());
    }

    register(user)
    {
        return this.http.post(this.configService.registerApiURI, user, this.jwt()).map((response: Response) => response.json());
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