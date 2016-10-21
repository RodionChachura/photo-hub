import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Headers, RequestOptions, BaseRequestOptions} from '@angular/http';

import { DataService } from './services/data.service'

import { AlbumsDataService } from './services/albums-data.service'
import { PhotosDataService } from './services/photos-data.service'
import { UsersDataService } from './services/users-data.service'


import { AuthenticationService } from './services/authentication.service'
import { ConfigService } from './services/config.service'
import { NotificationService } from './services/notification.service'
import { UtilityService } from './services/utility.service'

import { routing } from './app.routes';

import { EqualValidator } from './directives/equal-validator.directive'

import { AuthGuard } from './guards/auth.guard'

import { AppComponent }  from './app.component';
import { HomeComponent }  from './components/home.component';
import { LoginComponent }  from './components/login/login.component';
import { RegisterComponent }  from './components/register/register.component';
import { AlbumsComponent }  from './components/albums/albums.component';
import { PhotosComponent }  from './components/photos/photos.component';





class AppBaseRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers();

    constructor() {
        super();
        this.headers.append('Content-Type', 'application/json');
        this.body = '';
    }
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlbumsComponent,
        PhotosComponent,
        EqualValidator
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        ConfigService,
        NotificationService,
        DataService,
        AlbumsDataService,
        PhotosDataService,
        UsersDataService,
        UtilityService,
        { provide: RequestOptions, useClass: AppBaseRequestOptions }],
    bootstrap: [AppComponent]
})
export class AppModule { }

