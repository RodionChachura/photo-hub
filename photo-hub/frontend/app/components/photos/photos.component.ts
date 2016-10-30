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
    private userId: number;
    private username: string;
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
        this.dataService.getUserPhotos(this.userId)
            .subscribe((photos: IPhoto[]) => {
                this.photos = photos;
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load photos. ' + error);
            });
        if (this.userId == this.dataService.getCurrentUserId()){
            this.isOwner = true;
            this.username = this.dataService.getCurrentUserUsername()
        }
        else{
            if(this.photos.length > 0){
                this.username = this.photos[0].username;
            }
            else{
                this.router.navigate(['/users']);
                this.notificationService.printErrorMessage("this user doesn't have any photo. How you appear here?")
            }
        }
    }

    delete(photo){
        this.dataService.deletePhoto(photo.id).subscribe((res) => {
                var index = this.photos.indexOf(photo, 0);
                if (index > -1) {
                    this.photos.splice(index, 1);
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