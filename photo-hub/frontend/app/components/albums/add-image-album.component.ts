import { Component, ViewChild, OnInit} from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';

import { DataService } from '../../services/data.service'
import { NotificationService } from '../../services/notification.service';
import { IAlbum } from '../../models/album';


@Component({
    selector: 'add-image-album',
    templateUrl: 'static/app/components/albums/add-image-album.component.html',
})
export class AddImageAlbumComponent implements OnInit {
    private _title: string;
    private _photo: any;
    private _attachment: boolean;
    private _albumId: number;
    private _userId: number;
    @ViewChild("photo") photo;

    constructor(private route: ActivatedRoute,
        public router: Router,
        public dataService: DataService,
        public notificationService: NotificationService) { }

    ngOnInit() {
        this.route.params.subscribe(params =>{
            this._albumId = params['id'];
        })
        this._userId = this.dataService.getCurrentUserId();
    }

    uploadChanged(): void {
        let fi = this.photo.nativeElement;
        this._attachment = (fi.files && fi.files[0])? true : false; 
    }

    upload(): void {
        let fi = this.photo.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            
            this.dataService.uploadPhotoToAlbum(fileToUpload, this._title, this._albumId)
                .subscribe(res => {
                    this.router.navigate(['/albums', this._albumId]);
                    this.notificationService.printSuccessMessage(this._title + ' uploaded!');
                },
                error => {
                this.notificationService.printErrorMessage('Failed to load image ' + error);
            });
        }
    }
}