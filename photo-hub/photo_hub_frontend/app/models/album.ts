export class Album {
    Url: string;
    Title: string;
    DateCreated: Date;
    TotalPhotos: number;
    UserUrl: string;
    Username: string

    constructor(title: string,
        dateCreated: Date,
        totalPhotos: number,
        url='',
        userUrl='',
        username='') {
        this.Title = title;
        this.DateCreated = dateCreated;
        this.TotalPhotos = totalPhotos;
        this.Url = url;
        this.UserUrl = userUrl;
        this.Username = username;
    }
}