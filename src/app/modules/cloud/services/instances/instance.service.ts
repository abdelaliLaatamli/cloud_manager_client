import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { InstanceDB } from './../../interfaces/instance';
import { ResponseGeneratorService } from '../responseGenerator/response-generator.service';
import { InstallationResponse } from './../../interfaces/installation-response';



@Injectable({
  providedIn: 'root'
})
export class InstanceService {

  constructor(
    private http: HttpClient ,
    private responseGeneratorService: ResponseGeneratorService
    ) { }

  getInstances( accountId: number): Observable<any>{

      const base = this.http.get( `${environment.apiUrl}/instances/${accountId}` );
      return base ;
  }


  updateVmta( vmtaUpdate: InstanceDB ): Observable<InstanceDB>{

      const base = this.http.put<InstanceDB>(`${environment.apiUrl}/instances/update/vmta/${vmtaUpdate.instanceId}` , vmtaUpdate);
      return base ;

  }

  addInstance( instances , accountId ): Observable<any>{

      const base = this.http.post( `${environment.apiUrl}/instances/${accountId}` , instances );
      return base ;
  }

  deleteInstance( instanceId , accountId ): Observable<any> {

    const base = this.http.delete( `${environment.apiUrl}/instances/${accountId}/${instanceId}` );
    return base ;

  }


  installInsance( instanceRequest: InstanceDB ): InstallationResponse {

    // let body: any = {

    //   server_name : instance.name   ,
    //   main_ip     : instance.networks.v4[1].ip_address  ,
    //   vmta_domain : instance.database.vmtaDomain

    // } ;

    const response: InstallationResponse = this.responseGeneratorService.generateInstalationResponse();

    if ( response.code === 200 ){
      const url = `${environment.apiUrl}/instances/update/install/${instanceRequest.instanceId}`;
      const base = this.http.put<InstanceDB>( url , instanceRequest );

      response.db = base;

    }

    return response;
  }

  updateOptionInstance( instanceId , accountId , operation ): Observable<any>{

    const base = this.http.put<InstanceDB>(`${environment.apiUrl}/instances/options/${accountId}/${instanceId}/${operation}` , {});
    return base ;

  }

}
