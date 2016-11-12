import { Component, ViewChild, OnInit} from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';

import { DataService } from '../../services/data.service'
import { NotificationService } from '../../services/notification.service';
import { IAlbumForSelection } from '../../models/album-selection';
import { IPaginated } from '../../models/paginated';


@Component({
    selector: 'add-image',
    templateUrl: 'static/app/components/photos/add-image.component.html',
})
export class AddImageComponent implements OnInit {
    private _title: string;
    private _attachment: boolean;
    private _userId: number;
    private _albums: IAlbumForSelection[];
    private _albumId: number;
    private _noAlbum: string = "No album";
    private _disabled: boolean = false;
    @ViewChild("photo") photo;

    constructor(private route: ActivatedRoute,
        public router: Router,
        public dataService: DataService,
        public notificationService: NotificationService) { }

    ngOnInit() {
        this._userId = this.dataService.getCurrentUserId();
        this.dataService.getUserAlbumsForSelection(this._userId)
            .subscribe((albums: IAlbumForSelection[]) => {
                    this._albums = albums;
                    console.log(albums)
                    if(this._albums.length != 0){
                        this._albums.push({id: 0, title: this._noAlbum})
                        this._albumId = 0;
                    }
                });
    }

    uploadChanged(): void {
        let fi = this.photo.nativeElement;
        this._attachment = (fi.files && fi.files[0])? true : false; 
    }

    upload(): void {
        let fi = this.photo.nativeElement;

        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this._disabled = true;

            this.dataService.createPhoto(fileToUpload, this._title, (this._albumId == 0)? null: this._albumId)
                .subscribe(res => {
                    if(this._albumId == 0)
                        this.router.navigate(['/user-photos', this._userId]);
                    else
                        this.router.navigate(['/albums', this._albumId]);
                    this.notificationService.printSuccessMessage(this._title + ' uploaded!');
                },
                error => {
                    this.notificationService.printErrorMessage(error);
                });
        }
    }
}