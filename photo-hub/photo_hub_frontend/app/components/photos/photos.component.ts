import { Component, OnInit } from '@angular/core';
import { Photo } from '../../models/photo';
import { Album } from '../../models/album';
import { PhotosDataService } from '../../services/photos-data.service';
import { UsersDataService } from '../../services/users-data.service';


@Component({
    selector: 'photos',
    templateUrl: './app/components/photos/photos.component.html'
})
export class PhotosComponent implements OnInit {
    private _photos: Array<Photo>;

    constructor(public dataService: PhotosDataService,
        public usersDataService: UsersDataService) {
    }

    ngOnInit() {
        this._photos = this.dataService.getUserPhotos(this.usersDataService.getCurrentUserUrl())
    }
}