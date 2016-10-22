import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 

import { Album } from '../../models/album';

import { AlbumsDataService } from '../../services/albums-data.service';
import { ConfigService } from '../../services/config.service';
import { UtilityService } from '../../services/utility.service';

@Component({
    selector: 'albums',
    templateUrl: './app/components/albums/albums.component.html'
})
export class AlbumsComponent implements OnInit {
    private _albums: Array<Album>;
    private username: string

    constructor(private route: ActivatedRoute,
        private router: Router,
        private configService: ConfigService,
        private albumsDataService : AlbumsDataService,
        private utilityService: UtilityService) {}


    ngOnInit() {
        this.route.queryParams.subscribe(params =>{
            this.username = params['username'] || '';
        })
        if (this.username != '')
            this.albumsDataService.getAlbumsByUsername(this.username)
    }

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}