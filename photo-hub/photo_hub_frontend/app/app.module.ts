import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Headers, RequestOptions, BaseRequestOptions} from '@angular/http';

import { AuthenticationService } from './services/authentication.service'
import { ConfigService } from './services/config.service'
import { NotificationService } from './services/notification.service'
import { UserService } from './services/user.service'

import { routing } from './app.routes';

import { EqualValidator } from './directives/equal-validator.directive'

import { AppComponent }  from './app.component';
import { AuthGuard } from './guards/auth.guard'
import { HomeComponent }  from './components/home.component';
import { LoginComponent }  from './components/login/login.component';
import { RegisterComponent }  from './components/register/register.component';


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
        EqualValidator
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        ConfigService,
        NotificationService,
        UserService,
        { provide: RequestOptions, useClass: AppBaseRequestOptions }],
    bootstrap: [AppComponent]
})
export class AppModule { }

