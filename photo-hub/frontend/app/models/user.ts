export class User {
    Id: string;
    Username: string;
    TotalPhotos: number;
    TotalAlbums: number;

    constructor(id: string,
        username: string,
        totalPhotos: number,
        totalAlbums: number) {
        this.Id = id;
        this.Username = username;
        this.TotalPhotos = totalPhotos;
        this.TotalAlbums = totalAlbums;
    }
}