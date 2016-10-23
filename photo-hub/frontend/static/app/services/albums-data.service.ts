import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConfigService } from './config.service'
import { UtilityService } from './utility.service'
import { NotificationService } from './notification.service'
import { DataService } from './data.service'
import { Album } from '../models/album'
 
@Injectable()
export class AlbumsDataService extends DataService{
    constructor(private _http: Http,
        private _utilityService: UtilityService,
        private _notificationService: NotificationService,
        private _configService: ConfigService) { 
        super(_http, _utilityService, _notificationService, _configService);
    }

    getAlbumsByUsername(username): Array<Album>{
        let albums = new Array<Album>();
        this.get(this._configService.albumsApiUrl + '?username=' + username + '/')
            .subscribe(res =>
                res.forEach(element => {
                    albums.push(new Album(element.name, element.creation_date, element.totalPhotos))
                },
                error =>{
                    this._utilityService.removeUser();
                }
                )
            )
        console.log(albums)
        return albums
    }

    getUserAlbums(userId): Array<Album>{
        let albums = new Array<Album>();
        this.get(this._configService.albumsApiUrl + '?user_id=' + userId)
            .subscribe(res =>
                res.forEach(element => {
                    albums.push(new Album(element.name, element.creation_date, element.totalPhotos))
                }),
                error =>{
                    this._utilityService.removeUser();
                }
            )
        return albums
    }

    getAlbums(url): Array<Album>{
        let albums = new Array<Album>();
        this.get(url)
            .subscribe(res =>
                res.forEach(element => {
                    albums.push(new Album(element.name, element.creation_date, element.totalPhotos, element.url, element.user, element.username))
                }),
                error =>{
                    this._utilityService.removeUser();
                }
            )
        return albums
    }

    getAlbum(url): Album{
        let album: Album; 
        this.get(url)
            .subscribe(res =>
                album = new Album(res.name, res.creation_date, res.totalPhotos, res.user, res.username),
                error =>{
                    this._utilityService.removeUser();
                }
            )
        return album;
    }

}