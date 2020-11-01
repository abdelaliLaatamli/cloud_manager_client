import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {

  constructor( private http: HttpClient ) { }

  getInstances( accountId : number) :Observable<any>{

      let base = this.http.get( `${environment.apiUrl}/instances/${accountId}` );
      return base ;

  }

}
