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
    private albums: IAlbum[];
    private userId: number;
    private username: string
    private isOwner: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService : DataService,
        private utilityService: UtilityService,
        private notificationService: NotificationService) {}


    ngOnInit() {
        var userId: number;
        this.route.queryParams.subscribe(params =>{
            this.userId = params['user_id'] || null;
        })
        if (this.userId != null)
        {
            this.dataService.getUserAlbums(this.userId)
                .subscribe((albums: IAlbum[]) => {
                    this.albums = albums;
                },
                error => {
                    this.notificationService.printErrorMessage('Failed to load albums. ' + error);
                });
            if (this.userId == this.dataService.getCurrentUserId()){
                this.username = this.dataService.getCurrentUserUsername()
                this.isOwner = true;
            }
            else{
                if(this.albums.length > 0){
                    this.username = this.albums[0].username;
                }
                this.router.navigate(['/users']);
                this.notificationService.printErrorMessage("this user doesn't have any albums. How you appear here?")
            }
        }
    }

    deleteAlbum(album: IAlbum){
        this.dataService.deleteAlbum(album.id).subscribe((res) => {
                var index = this.albums.indexOf(album, 0);
                if (index > -1) {
                    this.albums.splice(index, 1);
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