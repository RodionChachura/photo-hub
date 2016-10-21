import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConfigService } from './config.service'
import { DataService } from './data.service'
import { Photo } from '../models/photo'
 
@Injectable()
export class PhotosDataService extends DataService{
    constructor(private _http: Http,
        private _configService: ConfigService) { 
        super(_http, _configService);
    }

    getUserPhotos(userUrl): Array<Photo>{
        let photos = new Array<Photo>();
        this.get(this._configService.getUserPhotosUrl(userUrl))
            .subscribe(res =>
                res.forEach(element => {
                    photos.push(new Photo(element.name, element.image, element.creation_date, element.album, element.albumname))
                })
            )
        return photos
    }

    getPhotos(userUrl): Array<Photo>{
        let photos = new Array<Photo>();
        this.get(this._configService.getUserPhotosUrl(userUrl))
            .subscribe(res =>
                res.forEach(element => {
                    photos.push(new Photo(element.name, element.image, element.creation_date, element.album, element.albumname, element.url, element.user, element.username))
                })
            )
        return photos
    }

    getPhoto(url): Photo{
        let photo: Photo;
        this.get(url)
            .subscribe(res =>
                new Photo(res.name, res.image, res.creation_date, res.album, res.albumname, res.url, res.user, res.username)
            )
        return photo
    }

}