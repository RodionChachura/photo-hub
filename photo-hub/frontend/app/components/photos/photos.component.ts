import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 

import { Photo } from '../../models/photo';

import { PhotosService } from '../../services/photos.service';
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
        private photosService : PhotosService,
        private utilityService: UtilityService) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params =>{
            this.userId = params['userId'] || null;
        })
        if (this.userId != null)
        {
            this._photos = this.photosService.getUserPhotos(this.userId);
            if (this.userId == this.configService.getCurrentUserId()){
                this.username = this.configService.getCurrentUserUsername()
                this.isOwner = true;
            }
            else 
                this.username = this.configService.selectedUser.Username;
        }
    }
}