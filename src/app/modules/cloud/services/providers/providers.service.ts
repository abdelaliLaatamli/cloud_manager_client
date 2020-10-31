import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment.prod';
import { AuthService } from './../../../../services/auth/auth.service';
import { Provider } from './../../interfaces/provider';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor( private http : HttpClient , private auth : AuthService ) { }


  getProviders () : Observable<[Provider]> {

      let base = this.http.get<[Provider]>( `${environment.apiUrl}/providers` )
      return base ;
  }



}
