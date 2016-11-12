import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 

import { IAlbum } from '../../models/album';
import { IPaginated } from '../../models/paginated'

import { DataService } from '../../services/data.service';
import { UtilityService } from '../../services/utility.service';
import { NotificationService } from '../../services/notification.service';
import { Paginated } from '../../shared/paginated' 

declare var jQuery: any;

@Component({
    selector: 'user-albums',
    templateUrl: 'static/app/components/albums/user-albums.component.html'
})
export class UserAlbumsComponent extends Paginated implements OnInit{
    private _albums: IAlbum[];
    private _userId: number;
    private _username: string;
    private _isOwner: boolean;
    private _defaultThumbnail = 'static/images/thumbnail-default.png';

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService : DataService,
        private utilityService: UtilityService,
        private notificationService: NotificationService) {
            super(1, 10);
        }

    ngOnInit() {
        this.route.params.subscribe(params =>{
            this._userId = params['id'];
        })
        this.getAlbums(true);
    }
    
    private getAlbums(onStart: boolean = false): void {
        this.dataService.getUserAlbums(this._userId, this._page, this._pageSize)
            .subscribe((paginated: IPaginated<IAlbum>) => {
                this._albums = paginated.results;
                this._totalCount = paginated.count;
                this.calculatePagesCount();

                if (onStart){
                    this.isOwnerStartLogic();
                    this.fancyboxOn();
                }
            },
            error => {
                this.notificationService.printErrorMessage(error);
            });
    }

    private isOwnerStartLogic(): void {
        if (this._userId == this.dataService.getCurrentUserId()){
            this._username = this.dataService.getCurrentUserUsername()
            this._isOwner = true;
        }
        else{
            if(this._albums.length > 0){
                this._username = this._albums[0].username;
            }
            else{
                this.notificationService.printErrorMessage("this user doesn't have any albums. How you appear here?")
                this.router.navigate(['/users']);
            }
        }
    }

    private fancyboxOn(){
        jQuery(document).ready(function(){ //Photos Gallery
            jQuery(".fancybox").fancybox({
                openEffect: "elastic",
                closeEffect: "none"
            });
        });
    }

    search(i): void {
        super.search(i);
        this.getAlbums();
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