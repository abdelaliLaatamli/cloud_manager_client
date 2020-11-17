import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor( private http : HttpClient ) { }


  getTasks(accountId): Observable<any>{

    const request = this.http.get( `${environment.apiUrl}/tasks/${accountId}` );
    return request ;

  }
}
