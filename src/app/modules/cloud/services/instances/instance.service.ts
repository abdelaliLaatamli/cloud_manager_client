import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { InstanceDB } from './../../interfaces/instance';
import { ResponseGeneratorService } from '../responseGenerator/response-generator.service';



@Injectable({
  providedIn: 'root'
})
export class InstanceService {

  constructor(
    private http: HttpClient ,
    private responseGeneratorService: ResponseGeneratorService
    ) { }

  getInstances( accountId : number) :Observable<any>{

      const base = this.http.get( `${environment.apiUrl}/instances/${accountId}` );
      return base ;
  }


  updateVmta( vmtaUpdate : InstanceDB ) : Observable<InstanceDB>{

      let base = this.http.put<InstanceDB>(`${environment.apiUrl}/instances/update/vmta/${vmtaUpdate.instanceId}` , vmtaUpdate);
      return base ;

  }

  addInstance( instances , accountId ){

      let base = this.http.post( `${environment.apiUrl}/instances/${accountId}` , instances )
      return base ;
  }

  deleteInstance( instanceId , accountId ){

    let base = this.http.delete( `${environment.apiUrl}/instances/${accountId}/${instanceId}` )
    return base ;

  }


  installInsance( instance ) : { code : number , message : string , db? : Observable<InstanceDB> } {

    // let body: any = {

    //   server_name : instance.name   ,
    //   main_ip     : instance.networks.v4[1].ip_address  ,
    //   vmta_domain : instance.database.vmtaDomain

    // } ;

    let response : { code : number , message : string  , db ? : Observable<InstanceDB> } = this.responseGeneratorService.generateInstalationResponse()

    if( response.code == 200 ){
      let instanceRequest : InstanceDB = {

        instanceId  : instance.id ,
        name        : instance.name ,
        vmtaDomain  : instance.database.vmtaDomain ,
        mainIp      : instance.networks.v4[1].ip_address ,
        isInstalled : true
      }

      let base = this.http.put<InstanceDB>(`${environment.apiUrl}/instances/update/install/${instance.id}` , instanceRequest );

      response.db = base

    }

    return response
    // console.log( `${environment.apiUrl}/instances/update/install/${instance.id}` )

    // if( response.code == 200 )
      //let base = this.http.put<InstanceDB>(`${environment.apiUrl}/instances/update/vmta/${instance.id}` , vmtaUpdate);
    // return base ;

  }

  updateOptionInstance( instanceId , accountId , operation ):Observable<any>{

    let base = this.http.put<InstanceDB>(`${environment.apiUrl}/instances/options/${accountId}/${instanceId}/${operation}` , {});
    return base ;

  }

}
