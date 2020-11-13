import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http: HttpClient ) { }


  loadUsers(): Observable<any[]> {
    const base = this.http.get<any[]>( `${environment.apiUrl}/users` );
    return base ;
  }

  registerUser( user: any ) : Observable<any>{
      const request = this.http.post( `${environment.apiUrl}/users/register` , user );
      return request;
  }


  updateUser( user : any , changePassword: boolean ) : Observable<any>{

    const userId= user.id;

    delete user["id"]
    const request = this.http.put( (changePassword) ?
                                      `${environment.apiUrl}/users/${userId}/pwdreset` :
                                      `${environment.apiUrl}/users/${userId}` , user );
    return request;
  }

}
