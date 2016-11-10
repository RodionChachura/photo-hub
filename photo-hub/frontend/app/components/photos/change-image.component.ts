import { Component, ViewChild, OnInit} from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';

import { DataService } from '../../services/data.service'
import { NotificationService } from '../../services/notification.service';
import { IAlbumForSelection } from '../../models/album-selection';
import { IPhoto } from '../../models/photo';


@Component({
    selector: 'add-image',
    templateUrl: 'static/app/components/photos/change-image.component.html',
})
export class ChangeImageComponent implements OnInit {
    private _title: string;
    private _userId: number;
    private _albums: IAlbumForSelection[];
    private _photoId: number;
    private _albumId: number = 0;
    private _noAlbum: string = "No album";
    private _disabled: boolean = true;

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
                if(photo.albumId != null){
                    this._albumId = photo.albumId;
                }
            })
        this.dataService.getUserAlbums(this._userId)
            .subscribe((albums: IAlbumForSelection[]) => {
                    this._albums = albums;
                    if(this._albums.length != 0){
                        this._albums.push({id: 0, title: this._noAlbum})
                    }
                });
    }

    change(): void {
        this._disabled = true;
        this.dataService.updatePhoto(this._photoId, this._title, (this._albumId==0)? null : this._albumId)
            .subscribe(res =>{
                if(this._albumId == 0)
                    this.router.navigate(['/photos'], {queryParams: {user_id: this._userId}});
                else
                    this.router.navigate(['/albums', this._albumId]);
                this.notificationService.printSuccessMessage("Photo changed!");
            },
            error=>{
                this.notificationService.printErrorMessage(error)
            })
    }
}