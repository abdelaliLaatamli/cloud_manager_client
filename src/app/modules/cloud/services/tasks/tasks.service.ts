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

  addTask( taskRequest ): Observable<any>{

    const request = this.http.post( `${environment.apiUrl}/tasks` , taskRequest );
    return request ;

  }

  deleteTask( taskId ): Observable<any>{

    const request = this.http.delete( `${environment.apiUrl}/tasks/${taskId}` );
    return request ;
  }

  updateTask( taskId , action ) : Observable<any>{

    const request = this.http.put( `${environment.apiUrl}/tasks/action/${taskId}` , { 'action' : action} );
    return request ;

  }


}
