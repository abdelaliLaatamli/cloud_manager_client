import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment.prod';
import { AccountForKeys } from './../../interfaces/account-for-keys';
import { Account } from '../../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor( private http : HttpClient) { }

  getAccounts( accountId ): Observable<Account> {
    const base = this.http.get<Account>(`${environment.apiUrl}/accounts/provider/${accountId}`);
    return base ;
  }

  getAccountDetails( accountId ): Observable<Account>  {
    const base = this.http.get<Account>(`${environment.apiUrl}/accounts/g/${accountId}`);
    return base ;
  }

  addAccount( providerId , accountPayload: Account ): Observable<Account>{

    const base = this.http.post<Account> ( `${environment.apiUrl}/accounts/${providerId}` , accountPayload );

    return base;
  }

  editAccount( accountId , accountPayload: Account ): Observable<Account>{

    delete accountPayload.id;

    const base = this.http.put<AccountForKeys> ( `${environment.apiUrl}/accounts/${accountId}` , accountPayload );
    return base;

  }


  linkActionUser( userId , accountId , action ) : Observable<Account>{

    const request = {
      userId: userId ,
      action: action
    };

    const base = this.http.put<Account>( `${environment.apiUrl}/accounts/linkaction/${accountId}` , request );
    return base;

  }


  deleteAccount( accountId ) : Observable<any>{

    let base = this.http.delete ( `${environment.apiUrl}/accounts/${accountId}` );

    return base;
  }


}
