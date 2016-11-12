import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 

import { IPhoto } from '../../models/photo';
import { IPaginated } from '../../models/paginated'

import { DataService } from '../../services/data.service';
import { UtilityService } from '../../services/utility.service';
import { NotificationService } from '../../services/notification.service';
import { Paginated } from '../../shared/paginated' 


declare var jQuery: any;

@Component({
    selector: 'user-photos',
    templateUrl: 'static/app/components/photos/user-photos.component.html'
})
export class UserPhotosComponent extends Paginated implements OnInit{
    private _photos: IPhoto[];
    private _userId: number;
    private _username: string;
    private _isOwner: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService : DataService,
        private utilityService: UtilityService,
        private notificationService: NotificationService) {
            super(1, 10);
        }

    ngOnInit() {
        this.route.params.subscribe(params =>{
            this._userId = params['id'];
        })
        this.getPhotos(true);
    }

    private getPhotos(onStart: boolean = false): void {
        this.dataService.getUserPhotos(this._userId, this._page, this._pageSize)
            .subscribe((paginated: IPaginated<IPhoto>) => {
                this._photos = paginated.results;
                this._totalCount = paginated.count;
                this.calculatePagesCount();

                if (onStart){
                    this.isOwnerStartLogic();
                    this.fancyboxOn();
                }
            },
            error => {
                this.notificationService.printErrorMessage(error);
            });
    }

    private isOwnerStartLogic(): void {
        if (this._userId == this.dataService.getCurrentUserId()){
            this._username = this.dataService.getCurrentUserUsername()
            this._isOwner = true;
        }
        else{
            if(this._photos.length > 0){
                this._username = this._photos[0].username;
            }
            else{
                this.notificationService.printErrorMessage("this user doesn't have any photos. How you appear here?")
                this.router.navigate(['/users']);
            }
        }
    }

    private fancyboxOn(){
        jQuery(document).ready(function(){ //Photos Gallery
            jQuery(".fancybox").fancybox({
                openEffect: "elastic",
                closeEffect: "none"
            });
        });
    }

    delete(photo: IPhoto){
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

    like(photo: IPhoto){
        if (photo.userId == this.dataService.getCurrentUserId())
        {
            this.notificationService.printSuccessMessage("You can't like your photos")
        }
        else
        {
            this.dataService.createLike(photo.id).subscribe((res) => {
                    photo.totalLikes++;
                });
        }
    }

    search(i): void {
        super.search(i);
        this.getPhotos();
    }

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}