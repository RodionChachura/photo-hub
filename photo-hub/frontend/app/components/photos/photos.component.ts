import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 

import { IPhoto } from '../../models/photo';

import { DataService } from '../../services/data.service';
import { UtilityService } from '../../services/utility.service';
import { NotificationService } from '../../services/notification.service';

declare var jQuery: any;

@Component({
    selector: 'photos',
    templateUrl: 'static/app/components/photos/photos.component.html'
})
export class PhotosComponent implements OnInit{
    private _photos: IPhoto[];
    private _userId: number;
    private _username: string;
    private _isOwner: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService : DataService,
        private utilityService: UtilityService,
        private notificationService: NotificationService) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params =>{
            this._userId = params['user_id'] || null;
        })
        this.dataService.getUserPhotos(this._userId)
            .subscribe((photos: IPhoto[]) => {
                this._photos = photos;
                this.fancyboxOn();
            },
            error => {
                this.notificationService.printErrorMessage('Failed to load photos. ' + error);
            });
        if (this._userId == this.dataService.getCurrentUserId()){
            this._isOwner = true;
            this._username = this.dataService.getCurrentUserUsername()
        }
        else{
            if(this._photos.length > 0){
                this._username = this._photos[0].username;
            }
            else{
                this.router.navigate(['/users']);
                this.notificationService.printErrorMessage("this user doesn't have any photo. How you appear here?")
            }
        }
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
                var index = this._photos.indexOf(photo, 0);
                if (index > -1) {
                    this._photos.splice(index, 1);
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