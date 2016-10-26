import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router'

import { AlbumsService } from '../../services/albums.service'
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'add-album',
    templateUrl: 'static/app/components/albums/add-album.component.html',
})
export class AddAlbumComponent {
    private _title: string;

    constructor(public albumsService: AlbumsService,
                public notificationService: NotificationService,
                public router: Router) { }

    create(): void {
        this.albumsService.createAlbum(this._title).subscribe(data => {
                this.notificationService.printSuccessMessage("Album created");
                this.router.navigate(['/albums']);
            },
            error =>
            { 
                console.error('Error: ' + error);
                this.notificationService.printErrorMessage(error);
            });
    }
}