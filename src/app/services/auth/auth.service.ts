import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient , private router : Router) { }


  login( data : { email : string , password : string }){

      let base = this.http.post<{token:string , id:number}>( `${environment.apiUrl}/auth/login` , data )

      let request = base.pipe(

        map( ( res : {token:string , id:number} ) => {
          if( res.token ){
            this.savetoken(res.token , res.id )
            this.router.navigateByUrl('/dash')
          }
          return res
        })
      )
      return request

  }

  logout(){
    this.removeToken()
    this.router.navigateByUrl("/")
  }

  removeToken(){
    localStorage.removeItem( "token")
    localStorage.removeItem( "userId")
  }

  savetoken( token , userid ){
      localStorage.setItem( "token" , token )
      localStorage.setItem( "userId" , userid )
  }


  getToken(): string{
    return localStorage.getItem("token")
  }


  getUser(){
    return JSON.parse( atob(this.getToken().split('.')[1]));
  }

}
