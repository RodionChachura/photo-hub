import { IPhoto } from './photo'

export interface IAlbumDetail {
    id: number;
    title: string;
    creationDate: Date;
    photos: IPhoto[];
    totalPhotos: number;
    totalLikes: number;
    userId: number;
    username: string;
    thumbnail: string;
}