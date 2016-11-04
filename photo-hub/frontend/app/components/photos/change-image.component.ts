import { Component, ViewChild, OnInit} from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';

import { DataService } from '../../services/data.service'
import { NotificationService } from '../../services/notification.service';
import { IAlbum } from '../../models/album';
import { IPhoto } from '../../models/photo';


@Component({
    selector: 'add-image',
    templateUrl: 'static/app/components/photos/change-image.component.html',
})
export class ChangeImageComponent implements OnInit {
    private _title: string;
    private _userId: number;
    private _albums: IAlbum[];
    private _photoId: number;
    private _albumId: number = 0;
    private _noAlbum: string = "No album";

    constructor(private route: ActivatedRoute,
        public router: Router,
        public dataService: DataService,
        public notificationService: NotificationService) { }

    ngOnInit() {
        this.route.params.subscribe(params =>{
            this._photoId = params['id'];
        })
        this._userId = this.dataService.getCurrentUserId();
        this.dataService.getPhoto(this._photoId)
            .subscribe((photo: IPhoto) => {
                this._title = photo.title;
                this._albumId = photo.albumId;
            })
        this.dataService.getUserAlbums(this._userId)
            .subscribe((albums: IAlbum[]) => {
                    this._albums = albums;
                    if(this._albums.length != 0){
                        // really bad code!
                        this._albums.push({id: 0, title: this._noAlbum, creationDate: Date.prototype, totalPhotos: 0, userId: 0, username: '', thumbnail: ''})
                    }
                });
    }

    change(): void {
        if(this._albumId == 0){
            this.dataService.createPhoto(this._photoId, this._title, (this._albumId==0)? null : this._albumId)
                .subscribe(res =>{
                    this.notificationService.printSuccessMessage("Photo changed!");
                    this.router.navigate(['/photos'], {queryParams: {user_id: this._userId}});
                },
                error=>{
                    this.notificationService.printErrorMessage('Failed to change ' + this._title + ' photo : ' + error)
                })
        }
    }
}