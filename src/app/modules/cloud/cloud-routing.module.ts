import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashAccountsComponent } from './components/dash-accounts/dash-accounts.component';
import { DashHelpComponent } from './components/dash-help/dash-help.component';
import { DashHomeComponent } from './components/dash-home/dash-home.component';
import { DashInstancesComponent } from './components/dash-instances/dash-instances.component';
import { DashParamsComponent } from './components/dash-params/dash-params.component';
import { DashProvidersComponent } from './components/dash-providers/dash-providers.component';
import { DashStatsComponent } from './components/dash-stats/dash-stats.component';
import { DashTasksComponent } from './components/dash-tasks/dash-tasks.component';
import { DashUsersComponent } from './components/dash-users/dash-users.component';
import { ParentDashComponent } from './components/parent-dash/parent-dash.component';

const routes: Routes = [

  { path : '' ,
    component : ParentDashComponent ,
    children : [
      // { path : '' , component : DashHomeComponent },
      { path : '',   redirectTo: '/dash/home', pathMatch: 'full' },
      { path : 'home' , component : DashHomeComponent },
      // { path : '' }
      { path : 'instances' , component : DashInstancesComponent },
      { path : 'tasks' , component : DashTasksComponent },
      { path : 'statisques' , component : DashStatsComponent },
      { path : 'providers' , component : DashProvidersComponent },
      { path : 'users' , component : DashUsersComponent },
      { path : 'accounts' , component : DashAccountsComponent },
      { path : 'parametres' , component : DashParamsComponent },
      { path : 'infos' , component : DashHelpComponent },

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloudRoutingModule { }
