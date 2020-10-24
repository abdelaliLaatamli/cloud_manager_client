import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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


@NgModule({
  declarations: [ParentDashComponent, DashHomeComponent, DashInstancesComponent, DashTasksComponent, NavbarComponent, DashStatsComponent, DashProvidersComponent, DashUsersComponent, DashAccountsComponent, DashParamsComponent, DashHelpComponent],
  imports: [
    CommonModule,
    CloudRoutingModule
  ]
})
export class CloudModule { }
