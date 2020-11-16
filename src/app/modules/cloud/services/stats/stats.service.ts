import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor( private http: HttpClient ) { }


  loadUsersData(): Observable<any>{
    const request = this.http.get( `${environment.apiUrl}/statistiques/ofusers` );
    return request;
  }


  loadInstnacesOfProviderData(): Observable<any>{
    const request = this.http.get( `${environment.apiUrl}/statistiques/numberInstances` );
    return request;
  }


  loadInstnacesOfEntity(): Observable<any>{
    const request = this.http.get( `${environment.apiUrl}/statistiques/numberInstancesofentity` );
    return request;
  }

  loadInstancesOfAccount(): Observable<Array<any[]>>{
    const request = this.http.get<Array<any[]>>( `${environment.apiUrl}/home/instancesByAccount/8` );
    return request ;
  }


  loadInstancesOfEntitiesData(): Observable<any> {
    const request = this.http.get<any>( `${environment.apiUrl}/statistiques/stateOfEntities` );
    return request ;
  }


}
