import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { LoginComponent }  from './components/login/login.component';
import { RegisterComponent }  from './components/register/register.component';

import { UserAlbumsComponent }  from './components/albums/user-albums.component';
import { AddAlbumComponent }  from './components/albums/add-album.component';
import { AddImageAlbumComponent }  from './components/albums/add-image-album.component';
import { ChangeAlbumComponent }  from './components/albums/change-album.component';
import { AlbumDetailComponent }  from './components/albums/album-detail.component';

import { UserPhotosComponent }  from './components/photos/user-photos.component';
import { AddImageComponent }  from './components/photos/add-image.component';
import { ChangeImageComponent }  from './components/photos/change-image.component';

import { UsersComponent }  from './components/users/users.component';

import { AuthGuard } from './guards/auth.guard'

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user-albums/:id', component: UserAlbumsComponent, canActivate: [AuthGuard] },
    { path: 'add-album', component: AddAlbumComponent, canActivate: [AuthGuard] },
    { path: 'add-image-album/:id', component: AddImageAlbumComponent, canActivate: [AuthGuard] },
    { path: 'change-album/:id', component: ChangeAlbumComponent, canActivate: [AuthGuard] },
    { path: 'change-image/:id', component: ChangeImageComponent, canActivate: [AuthGuard] },
    { path: 'add-image', component: AddImageComponent, canActivate: [AuthGuard] },
    { path: 'albums/:id', component: AlbumDetailComponent, canActivate: [AuthGuard] },
    { path: 'user-photos/:id', component : UserPhotosComponent, canActivate: [AuthGuard] },
    { path: 'users', component : UsersComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);