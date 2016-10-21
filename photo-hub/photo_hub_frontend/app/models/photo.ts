export class Photo {
    Title: string;
    Uri: string;
    DateUploaded: Date;
    AlbumUrl: string;
    AlbumTitle: string;
    Url: string;
    UserUrl: string;
    Username: string;
    

    constructor(title: string,
        uri: string,
        dateUploaded: Date,
        albumUrl: string,
        albumTitle: string,
        url='',
        userUrl='',
        username='') {
        this.Title = title;
        this.Uri = uri;
        this.DateUploaded = dateUploaded;
        this.AlbumUrl = albumUrl;
        this.AlbumTitle = albumTitle;
        this.Url = url;
        this.UserUrl = userUrl;
        this.Username = username;
    }
}