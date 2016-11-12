import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { DataService } from '../../services/data.service'
import { NotificationService } from '../../services/notification.service';
import { IAlbum } from '../../models/album';


@Component({
    selector: 'add-album',
    templateUrl: 'static/app/components/albums/change-album.component.html',
})
export class ChangeAlbumComponent implements OnInit {
    private _albumId: number;
    private _title: string;
    private _userId: number;
    private _disabled: boolean;

    ngOnInit(){
        this.route.params.subscribe(params =>{
            this._albumId = params['id'];
        })
        this._userId = this.dataService.getCurrentUserId();
        this.dataService.getAlbum(this._albumId)
            .subscribe((album: IAlbum) => {
                this._title = album.title;
            })
    }
    constructor(private route: ActivatedRoute,
                public router: Router,
                public dataService: DataService,
                public notificationService: NotificationService) { }

    change(): void {
        this._disabled = true;
        this.dataService.updateAlbum(this._albumId, this._title)
            .subscribe(res =>{
                this.notificationService.printSuccessMessage("Album changed!");
                this.router.navigate(['/albums', this._userId]);
            },
            error=>{
                this.notificationService.printErrorMessage(error)
            })
    }
}