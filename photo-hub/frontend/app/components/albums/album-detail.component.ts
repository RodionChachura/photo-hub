import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { IPhoto } from '../../models/photo';
import { IAlbumDetail } from '../../models/album-detail';

import { DataService } from '../../services/data.service';
import { UtilityService } from '../../services/utility.service';
import { NotificationService } from '../../services/notification.service';

declare var jQuery: any;

@Component({
    selector: 'album-detail',
    templateUrl: 'static/app/components/albums/album-detail.component.html'
})
export class AlbumDetailComponent implements OnInit{
    private _albumDetail: IAlbumDetail;
    private _albumId: number;
    private _isOwner: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService : DataService,
        private utilityService: UtilityService,
        private notificationService: NotificationService) {}

    ngOnInit() {
        this.route.params.subscribe(params =>{
            this._albumId = params['id'];
            console.log(this._albumId);
        })
        this.dataService.getAlbum(this._albumId).subscribe((albumDetail: IAlbumDetail) => {
                this._albumDetail = albumDetail;
                this.fancyboxOn();
                this._isOwner = albumDetail.userId == this.dataService.getCurrentUserId();
                // if album doesn't have any photos and it is not album owner => redirect
                if (!this._isOwner && albumDetail.photos.length == 0){
                    this.notificationService.printErrorMessage("this album does not have any photos. How you appear here?")
                    this.utilityService.navigate('/');
                }
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load album: ' + error);
            });
    }

    fancyboxOn(){
        jQuery(document).ready(function(){ //Photos Gallery
            jQuery(".fancybox").fancybox({
                openEffect: "elastic",
                closeEffect: "none"
            });
        });
    }

    delete(photo){
        this.dataService.deletePhoto(photo.id).subscribe((res) => {
                var index = this._albumDetail.photos.indexOf(photo, 0);
                if (index > -1) {
                    this._albumDetail.photos.splice(index, 1);
                }
            },
            error => {
                this.notificationService.printErrorMessage('Failed to delete ' + photo.title + ' ' + error);
            });
    }

    like(photo: IPhoto){
        if (photo.userId == this.dataService.getCurrentUserId())
        {
            this.notificationService.printSuccessMessage("You can't like your photos")
        }
        else
        {
            this.dataService.createLike(photo.id).subscribe((res) => {
                    console.log(photo);
                    photo.totalLikes++;
                    console.log(photo);
                });
        }
    }

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}