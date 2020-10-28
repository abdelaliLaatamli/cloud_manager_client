import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule , FormsModule  } from '@angular/forms';


import { CloudRoutingModule } from './cloud-routing.module';
import { ParentDashComponent } from './components/parent-dash/parent-dash.component';
import { DashHomeComponent } from './components/dash-home/dash-home.component';
import { DashInstancesComponent } from './components/dash-instances/dash-instances.component';
import { DashTasksComponent } from './components/dash-tasks/dash-tasks.component';
import { NavbarComponent } from './components/parts/navbar/navbar.component';
import { DashStatsComponent } from './components/dash-stats/dash-stats.component';
import { DashProvidersComponent } from './components/dash-providers/dash-providers.component';
import { DashUsersComponent } from './components/dash-users/dash-users.component';
import { DashAccountsComponent } from './components/dash-accounts/dash-accounts.component';
import { DashParamsComponent } from './components/dash-params/dash-params.component';
import { DashHelpComponent } from './components/dash-help/dash-help.component';
import { AccountFourKeysComponent } from './components/dash-accounts/forms/account-four-keys/account-four-keys.component';
import { AccountOneKeyComponent } from './components/dash-accounts/forms/account-one-key/account-one-key.component';
import { AccountTwoKeysComponent } from './components/dash-accounts/forms/account-two-keys/account-two-keys.component';



@NgModule({
  declarations: [
    ParentDashComponent,
    DashHomeComponent,
    DashInstancesComponent,
    DashTasksComponent,
    NavbarComponent,
    DashStatsComponent,
    DashProvidersComponent,
    DashUsersComponent,
    DashAccountsComponent,
    DashParamsComponent,
    DashHelpComponent,
    AccountFourKeysComponent,
    AccountOneKeyComponent,
    AccountTwoKeysComponent,

  ],
  imports: [
    CommonModule,
    CloudRoutingModule ,
    ReactiveFormsModule ,
    FormsModule
  ]
})
export class CloudModule { }
