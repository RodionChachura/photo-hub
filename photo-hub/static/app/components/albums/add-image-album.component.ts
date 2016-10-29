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
    private albumId: number;
    @ViewChild("fileInput") fileInput;

    constructor(private route: ActivatedRoute,
        public router: Router,
        public dataService: DataService,
        public notificationService: NotificationService) { }

    ngOnInit() {
        this.route.params.subscribe(params =>{
            this.albumId = params['id'];
        })
    }

    upload(): void {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this.dataService.uploadPhotoToAlbum(fileToUpload, "testImage", this.albumId)
                .subscribe(res => {
                    console.log(res);
                });
            this.dataService.uploadPhotoToAlbumJSON(fileToUpload, "testImage", this.albumId)
            .subscribe(res => {
                console.log(res);
            });
        }
    }
}