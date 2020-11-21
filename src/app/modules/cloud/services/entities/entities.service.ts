import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  constructor( private http : HttpClient ) { }

  getEntities(): Observable<any[]>{

    const base = this.http.get<any[]> ( `${environment.apiUrl}/entities` );

    return base;

  }


}
