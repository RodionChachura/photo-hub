import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 

import { IPhoto } from '../../models/photo';

import { DataService } from '../../services/data.service';
import { UtilityService } from '../../services/utility.service';
import { NotificationService } from '../../services/notification.service';


@Component({
    selector: 'photos',
    templateUrl: 'static/app/components/photos/photos.component.html'
})
export class PhotosComponent implements OnInit {
    private photos: IPhoto[];
    private userId: string;
    private username: string
    private isOwner: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService : DataService,
        private utilityService: UtilityService,
        private notificationService: NotificationService) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params =>{
            this.userId = params['user_id'] || null;
        })
        if (this.userId != null)
        {
            this.dataService.getUserPhotos(this.userId)
                .subscribe((photos: IPhoto[]) => {
                    this.photos = photos;
                },
                error => {
                    this.notificationService.printErrorMessage('Failed to load photos. ' + error);
                });
            if (this.userId == this.dataService.getCurrentUserId()){
                this.username = this.dataService.getCurrentUserUsername()
                this.isOwner = true;
            }
            else 
                this.username = this.dataService.selectedUser.username;
        }
    }
}