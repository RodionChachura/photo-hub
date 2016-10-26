export class Photo {
    Id: number;
    Title: string;
    Uri: string;
    DateUploaded: Date;
    AlbumId: string;
    AlbumTitle: string;
    UserId: string;
    Username: string;
    

    constructor(id: number,
        title: string,
        uri: string,
        dateUploaded: Date,
        albumId: string,
        albumTitle: string,
        userId='',
        username='') {
        this.Id = id;
        this.Title = title;
        this.Uri = uri;
        this.DateUploaded = dateUploaded;
        this.AlbumId = albumId;
        this.AlbumTitle = albumTitle;
        this.UserId = userId;
        this.Username = username;
    }
}