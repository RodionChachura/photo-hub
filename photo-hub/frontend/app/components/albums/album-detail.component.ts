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
                this._isOwner = albumDetail.userId == this.dataService.getCurrentUserId();
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load album: ' + error);
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

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}