import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment.prod';
import { AccountForKeys } from './../../interfaces/account-for-keys';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor( private http : HttpClient) { }

  getAccount( accountId ) : Observable<Account>{

    let base = this.http.get<Account>(`${environment.apiUrl}/accounts/${accountId}`);

    return base ;
  }


  addAccount( providerId , accountPayload : Account ) : Observable<Account>{
    // console.log( providerId , accountPayload )

    let base = this.http.post<AccountForKeys> ( `${environment.apiUrl}/accounts/${providerId}` , accountPayload )

    return base
  }


}
