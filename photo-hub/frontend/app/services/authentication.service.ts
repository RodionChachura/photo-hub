import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    constructor(private http: Http) {}

    login(usernameOrPassword : string, password : string) {
        if(usernameOrPassword.indexOf('@') !== -1)
            var json = JSON.stringify({ email: usernameOrPassword, password: password })
        else
            var json = JSON.stringify({ username: usernameOrPassword, password: password })
        console.log(json);
        return this.http.post('api/login/', json)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    register(username: string, email: string, password: string){
        return this.http.post('api/register/', JSON.stringify({ username: username, email: email, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}