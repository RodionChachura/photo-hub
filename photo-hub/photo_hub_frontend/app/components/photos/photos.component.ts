import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 

import { Photo } from '../../models/photo';

import { PhotosDataService } from '../../services/photos-data.service';
import { ConfigService } from '../../services/config.service';
import { UtilityService } from '../../services/utility.service';


@Component({
    selector: 'photos',
    templateUrl: './app/components/photos/photos.component.html'
})
export class PhotosComponent implements OnInit {
    private _photos: Array<Photo>;
    private username: string

    constructor(private route: ActivatedRoute,
        private router: Router,
        private configService: ConfigService,
        private photosDataService : PhotosDataService,
        private utilityService: UtilityService) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params =>{
            this.username = params['username'] || '';
        })
        if (this.username != '')
            this.photosDataService.getPhotosByUsername(this.username)
    }
}