import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor( private http : HttpClient ) { }


  loadUsersData(): Observable<any[][]>{
    const request = this.http.get<any[][]>( `${environment.apiUrl}/statistiques/ofusers` );
    return request;
  }

}
