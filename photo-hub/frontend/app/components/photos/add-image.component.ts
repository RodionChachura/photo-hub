import { Component, ViewChild, OnInit} from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';

import { DataService } from '../../services/data.service'
import { NotificationService } from '../../services/notification.service';
import { IAlbum } from '../../models/album';


@Component({
    selector: 'add-image',
    templateUrl: 'static/app/components/photos/add-image.component.html',
})
export class AddImageComponent implements OnInit {
    private _title: string;
    private _photo: any;
    private attachment: boolean;
    private albumId: number;
    @ViewChild("photo") photo;

    constructor(private route: ActivatedRoute,
        public router: Router,
        public dataService: DataService,
        public notificationService: NotificationService) { }

    ngOnInit() {
        this.route.params.subscribe(params =>{
            this.albumId = params['id'];
        })
    }

    uploadChanged(): void {
        let fi = this.photo.nativeElement;
        this.attachment = (fi.files && fi.files[0])? true : false; 
    }

    upload(): void {
        let fi = this.photo.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            
            this.dataService.uploadPhotoToAlbum(fileToUpload, this._title, this.albumId)
                .subscribe(res => {
                    this.router.navigate(['/albums', this.albumId]);
                    this.notificationService.printSuccessMessage(this._title + ' uploaded!');
                },
                error => {
                this.notificationService.printErrorMessage('Failed to load image ' + error);
            });
        }
    }
}