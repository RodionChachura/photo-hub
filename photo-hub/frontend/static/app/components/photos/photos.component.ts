import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 

import { Photo } from '../../models/photo';

import { PhotosDataService } from '../../services/photos-data.service';
import { ConfigService } from '../../services/config.service';
import { UtilityService } from '../../services/utility.service';


@Component({
    selector: 'photos',
    templateUrl: 'static/app/components/photos/photos.component.html'
})
export class PhotosComponent implements OnInit {
    private _photos: Array<Photo>;
    private userId: string;
    private username: string
    private isOwner: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private configService: ConfigService,
        private photosDataService : PhotosDataService,
        private utilityService: UtilityService) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params =>{
            this.userId = params['userId'] || '';
            this.username = params['username'] || '';
        })
        if (this.userId != '')
        {
            this._photos = this.photosDataService.getUserPhotos(this.userId);
            this.isOwner = (this.configService.getCurrentUserId() == this.userId)? true: false;
        }
        else if (this.username != '')
        {
            this._photos = this.photosDataService.getPhotosByUsername(this.username);
            this.isOwner = (this.configService.getCurrentUserId() == this.userId)? true: false;
        }
    }
}