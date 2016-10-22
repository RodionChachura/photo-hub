export class Album {
    Title: string;
    DateCreated: Date;
    TotalPhotos: number;
    Id: string;
    UserId: string;
    Username: string

    constructor(title: string,
        dateCreated: Date,
        totalPhotos: number,
        id='',
        userId='',
        username='') {
        this.Title = title;
        this.DateCreated = dateCreated;
        this.TotalPhotos = totalPhotos;
        this.Id = id;
        this.UserId = userId;
        this.Username = username;
    }
}