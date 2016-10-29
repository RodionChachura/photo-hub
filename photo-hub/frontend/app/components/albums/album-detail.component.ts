import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { IPhoto } from '../../models/photo';
import { IAlbumDetail } from '../../models/album-detail';

import { DataService } from '../../services/data.service';
import { UtilityService } from '../../services/utility.service';
import { NotificationService } from '../../services/notification.service';


@Component({
    selector: 'album-detail',
    templateUrl: 'static/app/components/albums/album-detail.component.html'
})
export class AlbumDetailComponent implements OnInit {
    private albumDetail: IAlbumDetail;
    private albumId: number;
    private isOwner: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService : DataService,
        private utilityService: UtilityService,
        private notificationService: NotificationService) {}

    ngOnInit() {
        this.route.params.subscribe(params =>{
            this.albumId = params['id'];
            console.log(this.albumId);
        })
        this.dataService.getAlbum(this.albumId).subscribe((albumDetail: IAlbumDetail) => {
                this.albumDetail = albumDetail;
                this.isOwner = albumDetail.userId == this.dataService.getCurrentUserId();
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load album: ' + error);
            });
    }

    delete(photo){
        this.dataService.deletePhoto(photo.id).subscribe((res) => {
                var index = this.albumDetail.photos.indexOf(photo, 0);
                if (index > -1) {
                    this.albumDetail.photos.splice(index, 1);
                }
            },
            error => {
                this.notificationService.printErrorMessage('Failed to delete ' + photo.title + ' ' + error);
            });
    }

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}