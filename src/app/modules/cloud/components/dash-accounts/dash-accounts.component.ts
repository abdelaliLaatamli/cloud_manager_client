import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ProvidersService } from '../../services/providers/providers.service';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from './../../services/accounts/accounts.service';
import { AccountForKeys } from './../../interfaces/account-for-keys';

declare var $: any;

@Component({
  selector: 'app-dash-accounts',
  templateUrl: './dash-accounts.component.html',
  styleUrls: ['./dash-accounts.component.css']
})
export class DashAccountsComponent implements OnInit {

  $providers: Observable<any> ;
  $acconts: Observable<Account>;
  currentProvider;
  accountMisajour=null;

  constructor(
    private providerService : ProvidersService ,
    private accountService : AccountsService ,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {

    this.$providers = this.providerService.getProviders().pipe(
      catchError( err => {
        this.showError( err.error )
        return throwError(err);
      })
    )

    // this.$providers.subscribe( err => console.log( err ) )

  }


  showError( err ):void {
    this.toastr.error( err.message , err.error );
  }


  loadAccounts( provider ){
    this.currentProvider = provider
    this.$acconts = this.accountService.getAccount( provider.id ).pipe(
      catchError( err => {
        this.showError( err.error )
        return throwError(err);
      })
    )

    //this.$acconts.subscribe( e => console.log(e) , er => console.log( er ) )
  }


  private getAccountKeys(typeProvider) : Array<string> {
    switch( typeProvider ) {
      case "ONEKEY"   : return [ "name" , "token"  ] ;
      case "TWOKEYS"  : return [ "name" , "accessKey" , "secriteKey" ] ;
      case "FOURKEYS" : return [ "name" , "accessKey" , "secriteKey" , "subscription" , "tenant" ] ;
    }
  }


  showAddAccountModal(): void {

    //console.log( provider )
    this.accountMisajour = null
    $('#addAccounts').modal('show')

  }

  getSubmit( account ){
    // console.log( account )

    this.accountService.addAccount( this.currentProvider.id , account )
                        .subscribe(
                             elem => {
                              this.showSuccess( elem )
                              $('#addAccounts').modal('hide')
                              this.loadAccounts( this.currentProvider )
                            } ,
                            err => this.showError( err.error )
                        )

  }

  showSuccess( msg : Account ): void {
    this.toastr.success( msg.name , "Account added" );
  }

  editAccount(account){

    this.accountMisajour = account

    console.log( account )
    $('#addAccounts').modal('show')


  }


  deleteAccount(accountId){
    console.log( accountId )


  }




}
