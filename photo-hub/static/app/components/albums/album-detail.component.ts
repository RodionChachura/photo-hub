import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';
import { IPhoto } from '../../models/photo';

import { DataService } from '../../services/data.service';
import { UtilityService } from '../../services/utility.service';
import { NotificationService } from '../../services/notification.service';


@Component({
    selector: 'album-detail',
    templateUrl: 'static/app/components/albums/album-detail.component.html'
})
export class AlbumDetailComponent implements OnInit {
    private albumId: number;
    private albumTitle: string;
    private photos: IPhoto[];
    private username: string;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService : DataService,
        private utilityService: UtilityService,
        private notificationService: NotificationService) {}

    ngOnInit() {
        this.route.params.subscribe(params =>{
            this.albumId = params['id'];
        })
        console.log(this.dataService.selectedAlbum);
        this.albumTitle = this.dataService.selectedAlbum.title;
        this.dataService.getAlbumPhotos(this.albumId).subscribe((photos: IPhoto[]) => {
                this.photos = photos;
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load album: ' + error);
            });
    }

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}