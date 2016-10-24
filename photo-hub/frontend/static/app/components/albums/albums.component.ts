import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 

import { Album } from '../../models/album';

import { AlbumsService } from '../../services/albums.service';
import { ConfigService } from '../../services/config.service';
import { UtilityService } from '../../services/utility.service';

@Component({
    selector: 'albums',
    templateUrl: 'static/app/components/albums/albums.component.html'
})
export class AlbumsComponent implements OnInit {
    private _albums: Array<Album>;
    private userId: string;
    private username: string
    private isOwner: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private configService: ConfigService,
        private albumsService : AlbumsService,
        private utilityService: UtilityService) {}


    ngOnInit() {
        this.route.queryParams.subscribe(params =>{
            this.userId = params['userId'] || '';
            this.username = params['username'] || ''
        })
        if (this.userId != '')
        {
            this._albums = this.albumsService.getUserAlbums(this.userId);
            this.isOwner = (this.configService.getCurrentUserId() == this.userId)? true: false;
        }
        else if (this.username != '')
        {
            this._albums = this.albumsService.getAlbumsByUsername(this.username);
            this.isOwner = (this.configService.getCurrentUserId() == this.userId)? true: false;
        }
    }

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}