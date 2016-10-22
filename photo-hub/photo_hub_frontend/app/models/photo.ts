export class Photo {
    Title: string;
    Uri: string;
    DateUploaded: Date;
    AlbumId: string;
    AlbumTitle: string;
    Id: string;
    UserId: string;
    Username: string;
    

    constructor(title: string,
        uri: string,
        dateUploaded: Date,
        albumId: string,
        albumTitle: string,
        id='',
        userId='',
        username='') {
        this.Title = title;
        this.Uri = uri;
        this.DateUploaded = dateUploaded;
        this.AlbumId = albumId;
        this.AlbumTitle = albumTitle;
        this.Id = id;
        this.UserId = userId;
        this.Username = username;
    }
}