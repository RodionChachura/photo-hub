import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 

import { IAlbum } from '../../models/album';

import { DataService } from '../../services/data.service';
import { UtilityService } from '../../services/utility.service';
import { NotificationService } from '../../services/notification.service';

@Component({
    selector: 'albums',
    templateUrl: 'static/app/components/albums/albums.component.html'
})
export class AlbumsComponent implements OnInit {
    private _albums: IAlbum[];
    private _userId: number;
    private _username: string
    private _isOwner: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService : DataService,
        private utilityService: UtilityService,
        private notificationService: NotificationService) {}


    ngOnInit() {
        var userId: number;
        this.route.queryParams.subscribe(params =>{
            this._userId = params['user_id'] || null;
        })
        if (this._userId != null)
        {
            this.dataService.getUserAlbums(this._userId)
                .subscribe((albums: IAlbum[]) => {
                    this._albums = albums;
                },
                error => {
                    this.notificationService.printErrorMessage('Failed to load albums. ' + error);
                });
            if (this._userId == this.dataService.getCurrentUserId()){
                this._username = this.dataService.getCurrentUserUsername()
                this._isOwner = true;
            }
            else{
                if(this._albums.length > 0){
                    this._username = this._albums[0].username;
                }
                this.router.navigate(['/users']);
                this.notificationService.printErrorMessage("this user doesn't have any albums. How you appear here?")
            }
        }
    }

    deleteAlbum(album: IAlbum){
        this.dataService.deleteAlbum(album.id).subscribe((res) => {
                var index = this._albums.indexOf(album, 0);
                if (index > -1) {
                    this._albums.splice(index, 1);
                }
            },
            error => {
                this.notificationService.printErrorMessage('Failed to delete ' + album.title + ' ' + error);
            });
    }

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}