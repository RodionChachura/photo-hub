export class Album {
    Id: string;
    Title: string;
    DateCreated: Date;
    TotalPhotos: number;
    Thumbnail: string;
    UserId: string;
    Username: string

    constructor(
        id: string,
        title: string,
        dateCreated: Date,
        totalPhotos: number,
        thumbnail: string,
        userId='',
        username='') {
        this.Id = id;
        this.Title = title;
        this.DateCreated = dateCreated;
        this.TotalPhotos = totalPhotos;
        this.Thumbnail = thumbnail;
        this.UserId = userId;
        this.Username = username;
    }
}