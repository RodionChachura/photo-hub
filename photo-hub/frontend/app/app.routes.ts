import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent }  from './components/login/login.component';
import { RegisterComponent }  from './components/register/register.component';
import { AlbumsComponent }  from './components/albums/albums.component';
import { AddAlbumComponent }  from './components/albums/add-album.component';
import { AddImageAlbumComponent }  from './components/albums/add-image-album.component';
import { AlbumDetailComponent }  from './components/albums/album-detail.component';
import { PhotosComponent }  from './components/photos/photos.component';
import { UsersComponent }  from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard'

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'albums', component: AlbumsComponent, canActivate: [AuthGuard] },
    { path: 'add-album', component: AddAlbumComponent, canActivate: [AuthGuard] },
    { path: 'add-image-album/:id', component: AddImageAlbumComponent, canActivate: [AuthGuard] },
    { path: 'albums/:id', component: AlbumDetailComponent, canActivate: [AuthGuard] },
    { path: 'photos', component : PhotosComponent, canActivate: [AuthGuard] },
    { path: 'users', component : UsersComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);