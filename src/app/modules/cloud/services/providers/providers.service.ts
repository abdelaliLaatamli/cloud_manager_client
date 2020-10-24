import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment.prod';
import { AuthService } from './../../../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor( private http : HttpClient , private auth : AuthService ) { }


  getProviders () : Observable<any> {

      let base = this.http.get( `${environment.apiUrl}/providerss` )
      // let base = this.http.get( `${environment.apiUrl}/providers` )

      return base ;

  }



}
