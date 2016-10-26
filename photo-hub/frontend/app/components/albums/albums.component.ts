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
    private userId: number;
    private username: string
    private isOwner: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private configService: ConfigService,
        private albumsService : AlbumsService,
        private utilityService: UtilityService) {}


    ngOnInit() {
        this.route.queryParams.subscribe(params =>{
            this.userId = params['userId'] || null;
        })
        if (this.userId != null)
        {
            this._albums = this.albumsService.getUserAlbums(this.userId);
            if (this.userId == this.configService.getCurrentUserId()){
                this.username = this.configService.getCurrentUserUsername()
                this.isOwner = true;
            }
            else 
                this.username = this.configService.selectedUser.Username;
        }
    }

    saveSelected(album: Album){
        this.configService.selectedAlbum = album;
    }

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}