import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UtilityService } from './utility.service'
import { NotificationService } from './notification.service'
import { ConfigService } from './config.service'
import { DataService } from './data.service'
import { Photo } from '../models/photo'
 
@Injectable()
export class PhotosDataService extends DataService{
    constructor(private _http: Http,
        private _utilityService: UtilityService,
        private _notificationService: NotificationService,
        private _configService: ConfigService) { 
        super(_http, _utilityService, _notificationService, _configService);
    }

    getPhotosByUsername(username): Array<Photo>{
        let photos = new Array<Photo>();
        this.get(this._configService.photosApiUrl + '?username=' + username + '/')
            .subscribe(res =>
                res.forEach(element => {
                    photos.push(new Photo(element.name, element.image, element.creation_date, element.album_id, element.albumname))
                }),
                error =>{
                    this._utilityService.removeUser();
                }
            )
        console.log(photos)
        return photos
    }

    getUserPhotos(userId): Array<Photo>{
        let photos = new Array<Photo>();
        this.get(this._configService.photosApiUrl + '?user_id=' + userId)
            .subscribe(res =>
                res.forEach(element => {
                    photos.push(new Photo(element.name, element.image, element.creation_date, element.album_id, element.albumname))
                }),
                error =>{
                    this._utilityService.removeUser();
                }
            )
        console.log(photos);
        return photos
    }

    getPhoto(url): Photo{
        let photo: Photo;
        this.get(url)
            .subscribe(res =>
                new Photo(res.name, res.image, res.creation_date, res.album_id, res.albumname, res.url, res.user_id, res.username),
                error =>{
                    this._utilityService.removeUser();
                }
            )
        return photo
    }

}