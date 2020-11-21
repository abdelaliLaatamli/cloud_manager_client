import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ProvidersService } from '../../services/providers/providers.service';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from './../../services/accounts/accounts.service';
import { Account } from './../../interfaces/account';
import { UsersService } from '../../services/users/users.service';

declare var $: any;

@Component({
  selector: 'app-dash-accounts',
  templateUrl: './dash-accounts.component.html',
  styleUrls: ['./dash-accounts.component.css']
})
export class DashAccountsComponent implements OnInit {

  $providers: Observable<any> ;
  $acconts: Observable<Account>;
  users$: Observable<any[]>;
  attachedUsers$:Observable<Account>;
  currentProvider;
  accountMisajour=null;
  currentAccount: Account;
  attchingMode: boolean = false;

  constructor(
    private providerService: ProvidersService ,
    private accountService: AccountsService ,
    private userService: UsersService ,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.loadProviders();
    this.loadUsers();

  }


  showError( err ): void {
    this.toastr.error( err.message , err.error );
  }

  loadProviders(): void {

    this.$providers = this.providerService.getProviders().pipe(
      catchError( err => {
        this.showError( err.error );
        return throwError(err);
      })
    );
  }

  loadAccounts( provider ): void {
    this.currentProvider = provider;
    this.currentAccount=null;
    this.attchingMode=false;
    this.$acconts = this.accountService.getAccounts( provider.id ).pipe(
      // map( e => { console.log( e ) ; return e; } ),
      catchError( err => {
        this.showError( err.error );
        return throwError(err);
      })
    );
  }

  loadUsers(): void{
    this.users$ = this.userService.loadUsers().pipe(
      catchError( err => {
        this.showError( err );
        return throwError(err);
      } )
    );
  }

  chooseAccount(account): void{
    this.currentAccount=account;
    this.attachedUsers$ =this.accountService.getAccountDetails(account.id)
        .pipe( map(e => { console.log(e ) ; return e }) )
    this.attchingMode=false;
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

  private getAccountKeys(typeProvider) : Array<string> {
    switch( typeProvider ) {
      case "ONEKEY"   : return [ "name" , "token"  ] ;
      case "TWOKEYS"  : return [ "name" , "accessKey" , "secriteKey" ] ;
      case "FOURKEYS" : return [ "name" , "accessKey" , "secriteKey" , "subscription" , "tenant" ] ;
    }
  }


  showAddAccountModal(): void {

    this.accountMisajour = null
    $('#addAccounts').modal('show')

  }



  getSubmit( account ){

    if( account.id != null ){
      this.accountService.editAccount(account.id , account)
                          .subscribe(
                            (elem:Account)  => {
                              this.showSuccess( elem , "Account Updated" )
                              $('#addAccounts').modal('hide')
                              this.loadAccounts( this.currentProvider )
                            } ,
                            err => this.showError( err.error )
                          );

    }else {

      this.accountService.addAccount( this.currentProvider.id , account )
      .subscribe(
           (elem: Account)  => {
            this.showSuccess( elem , "Account added" );
            $('#addAccounts').modal('hide');
            this.loadAccounts( this.currentProvider );
          } ,
          err => this.showError( err.error )
      );

    }

  }

  showSuccess( account: Account , message ): void {
    this.toastr.success( account.name , message  );
  }

  editAccount(account): void {

    this.accountMisajour = account;
    $('#addAccounts').modal('show');
  }


  attachUser( userId ): void {

    this.accountService.linkActionUser( userId , this.currentAccount.id , 'attach' )
    .subscribe( elem => {
      this.chooseAccount(this.currentAccount)
      this.showSuccess( elem , "Account added" )
    } , err =>  this.showError( err.error ) )

  }


  deattachUser( userId  ): void{

    this.accountService.linkActionUser( userId , this.currentAccount.id , 'detach' )
      .subscribe( elem => {
          this.chooseAccount(this.currentAccount) ;
          this.showSuccess( elem , "Account added" );
       } , err =>  this.showError( err.error ) )

  }

  deleteAccount(account: Account): void {

    this.accountService.deleteAccount(account.id)
                        .subscribe(
                          _ => {
                          this.showSuccess( account , "Account has been Deleted" )
                          this.loadAccounts( this.currentProvider )
                        } ,
                       err => this.showError( err.error )
                      );

  }




}
