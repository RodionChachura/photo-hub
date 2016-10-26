import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConfigService } from './config.service'
import { UtilityService } from './utility.service'
import { NotificationService } from './notification.service'
import { DataService } from './data.service'
import { Album } from '../models/album'
import { Photo } from '../models/photo'
 
@Injectable()
export class AlbumsService extends DataService{
    constructor(private _http: Http,
        private _utilityService: UtilityService,
        private _notificationService: NotificationService,
        private _configService: ConfigService) { 
        super(_http, _utilityService, _notificationService, _configService);
    }

    createAlbum(title: string){
        let json = JSON.stringify({ name: title});
        console.log(json)
        return this.post(this._configService.albumsApiUrl, json);
    }

    getUserAlbums(userId): Array<Album>{
        let albums = new Array<Album>();
        this.get(this._configService.albumsApiUrl + '?user_id=' + userId)
            .subscribe(res =>
                res.forEach(element => {
                    albums.push(new Album(element.id, element.name, element.creation_date, element.totalPhotos, element.thumbnail))
                }),
                error =>{
                    if(error.status == 403)
                        this._utilityService.removeUser();
                    else
                        this._utilityService.pageNotFound();
                }
            )
        return albums
    }

    getAlbumPhotos(albumId): Array<Photo>{
        let photos = new Array<Photo>();
        this.get(this._configService.photosApiUrl + '?album_id=' + albumId)
            .subscribe(res =>
                res.forEach(element => {
                    photos.push(new Photo(element.id, element.name, element.image, element.creation_date, element.album_id, element.albumname))
                }),
                error =>{
                    if(error.status == 403)
                        this._utilityService.removeUser();
                    else
                        this._utilityService.pageNotFound();
                }
            )
        console.log(photos);
        return photos
    }

    getAlbum(id): Album{
        let album: Album; 
        this.get(this._configService.albumsApiUrl + id + '/')
            .subscribe(res =>
                album = new Album(res.id, res.name, res.creation_date, res.totalPhotos, res.thumbnail, res.user, res.username),
                error =>{
                    if(error.status == 403)
                        this._utilityService.removeUser();
                    else
                        this._utilityService.pageNotFound();
                }
            )
        return album;
    }

}