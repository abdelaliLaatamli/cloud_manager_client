import { HomeComponent } from './components/dash/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  { path : '',   redirectTo: '/login', pathMatch: 'full' },
  { path : 'login' , component : LoginComponent } ,
  // { path : 'dash'  , component : HomeComponent },
  { path : 'dash' , loadChildren : () => import('./modules/cloud/cloud.module').then( m => m.CloudModule) } ,
  { path : '**', component: Page404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
