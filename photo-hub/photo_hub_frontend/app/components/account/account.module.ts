import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

import { ConfigService } from '../../services/config.service';
import { MembershipService } from '../../services/membership.service';
import { NotificationService } from '../../services/notification.service';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login.component';
import { RegisterComponent }   from './register.component';

import { accountRouting } from './routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    accountRouting
  ],
  declarations: [
    AccountComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    MembershipService,
    NotificationService,
    ConfigService
  ]
})
export class AccountModule {}