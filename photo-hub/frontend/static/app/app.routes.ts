import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { LoginComponent }  from './components/login/login.component';
import { RegisterComponent }  from './components/register/register.component';
import { AlbumsComponent }  from './components/albums/albums.component';
import { PhotosComponent }  from './components/photos/photos.component';
import { AuthGuard } from './guards/auth.guard'

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'albums', component: AlbumsComponent, canActivate: [AuthGuard] },
    { path: 'photos', component : PhotosComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);