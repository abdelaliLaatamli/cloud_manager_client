import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { InstanceDB } from './../../interfaces/instance';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {

  constructor( private http: HttpClient ) { }

  getInstances( accountId : number) :Observable<any>{

      let base = this.http.get( `${environment.apiUrl}/instances/${accountId}` );
      return base ;

  }


  updateVmta( vmtaUpdate : InstanceDB ) : Observable<InstanceDB>{

      let base = this.http.put<InstanceDB>(`${environment.apiUrl}/instances/update/vmta/${vmtaUpdate.instanceId}` , vmtaUpdate);
      return base ;

  }

  addInstance( instances , accountId ){
      // console.log( instances )

      let base = this.http.post( `${environment.apiUrl}/instances/${accountId}` , instances )
      return base ;
  }

  deleteInstance( instanceId , accountId ){
    //console.log( instanceId , accountId )

    let base = this.http.delete( `${environment.apiUrl}/instances/${accountId}/${instanceId}` )
    return base ;
  }

}
