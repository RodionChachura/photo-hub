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

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService : DataService,
        private utilityService: UtilityService,
        private notificationService: NotificationService) {}

    ngOnInit() {
        var albumId: number;
        this.route.params.subscribe(params =>{
            albumId = params['id'];
        })
        this.dataService.getAlbum(albumId).subscribe((albumDetail: IAlbumDetail) => {
                this.albumDetail = albumDetail;
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load album: ' + error);
            });
    }

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}