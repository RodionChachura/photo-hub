import { Component, OnInit } from '@angular/core';
import { Album } from '../../models/album';

import { AlbumsDataService } from '../../services/albums-data.service';
import { UsersDataService } from '../../services/users-data.service';
import { ConfigService } from '../../services/config.service';
import { UtilityService } from '../../services/utility.service';

@Component({
    selector: 'albums',
    templateUrl: './app/components/albums/albums.component.html'
})
export class AlbumsComponent implements OnInit {
    private _albums: Array<Album>;

    constructor(private configService: ConfigService,
        private albumsDataService : AlbumsDataService,
        private usersDataService : UsersDataService,
        private utilityService: UtilityService) {}


    ngOnInit() {
        this._albums = this.albumsDataService
            .getUserAlbums(this.usersDataService.getCurrentUserUrl())
    }

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}