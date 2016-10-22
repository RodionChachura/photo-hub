import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConfigService } from './config.service'
import { UtilityService } from './utility.service'
import { NotificationService } from './notification.service'
 
@Injectable()
export class DataService {
    constructor(private http: Http,
        private utilityService: UtilityService,
        private notificationService: NotificationService,
        private configService: ConfigService) { }

    get(url: string, json=true){
        let responce = this.http.get(url, this.jwt()).map((response: Response) => json? response.json() : response);
        responce.map(res=>{
            if(res.status < 200 || res.status >= 300) {
                localStorage.removeItem('currentUser');
                this.utilityService.navigateToSignIn()
            }
        });    
        return responce 
    }

    post(url: string, data){
        let responce = this.http.post(url, data, this.jwt()).map((response: Response) => response.json());
        responce.map(res=>{
            if(res.status < 200 || res.status >= 300) {
                localStorage.removeItem('currentUser');
                this.utilityService.navigateToSignIn()
            }
        }); 
        return responce
    }

    delete(url: string){
        let responce = this.http.post(url, this.jwt()).map((response: Response) => response.json());
        responce.map(res=>{
            if(res.status < 200 || res.status >= 300) {
                localStorage.removeItem('currentUser');
                this.utilityService.navigateToSignIn()
            }
        });
        return responce 
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