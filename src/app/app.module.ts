import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { Page404Component } from './components/page404/page404.component';


import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { NgApexchartsModule } from "ng-apexcharts";

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/dash/home/home.component';

import { JwtInterceptor } from './interceptos/jwt/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Page404Component,
    HomeComponent,
  ],
  imports: [

    BrowserModule,
    ReactiveFormsModule ,
    FormsModule,
    HttpClientModule,
    AppRoutingModule ,
    NgApexchartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide  : HTTP_INTERCEPTORS ,
      useClass : JwtInterceptor ,
      multi    : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
