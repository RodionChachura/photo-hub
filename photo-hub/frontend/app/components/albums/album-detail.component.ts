import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { Photo } from '../../models/photo';

import { AlbumsService } from '../../services/albums.service';
import { ConfigService } from '../../services/config.service';
import { UtilityService } from '../../services/utility.service';

@Component({
    selector: 'album-detail',
    templateUrl: 'static/app/components/albums/album-detail.component.html'
})
export class AlbumDetailComponent implements OnInit {
    private _albumId: number;
    private _albumTitle: string;
    private _photos: Array<Photo>;
    private username: string;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private configService: ConfigService,
        private albumsService : AlbumsService,
        private utilityService: UtilityService) {}

    ngOnInit() {
        this.route.params.subscribe(params =>{
            this._albumId = params['id'];
        })
        console.log(this.configService.selectedAlbum);
        this._albumTitle = this.configService.selectedAlbum.Title;
        this._photos = this.albumsService.getAlbumPhotos(this._albumId);
    }

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}