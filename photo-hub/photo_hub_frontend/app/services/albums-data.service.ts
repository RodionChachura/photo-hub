import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ConfigService } from './config.service'
import { DataService } from './data.service'
import { Album } from '../models/album'
 
@Injectable()
export class AlbumsDataService extends DataService{
    constructor(private _http: Http,
        private _configService: ConfigService) { 
        super(_http, _configService);
    }

    getUserAlbums(userUrl): Array<Album>{
        let albums = new Array<Album>();
        this.get(this._configService.getUserAlbumsUrl(userUrl))
            .subscribe(res =>
                res.forEach(element => {
                    albums.push(new Album(element.name, element.creation_date, element.totalPhotos))
                })
            )
        console.log(albums)
        return albums
    }

    getAlbums(url): Array<Album>{
        let albums = new Array<Album>();
        this.get(url)
            .subscribe(res =>
                res.forEach(element => {
                    albums.push(new Album(element.name, element.creation_date, element.totalPhotos, element.url, element.user, element.username))
                })
            )
        return albums
    }

    getAlbum(url): Album{
        let album: Album; 
        this.get(url)
            .subscribe(res =>
                album = new Album(res.name, res.creation_date, res.totalPhotos, res.user, res.username)
            )
        return album;
    }

}