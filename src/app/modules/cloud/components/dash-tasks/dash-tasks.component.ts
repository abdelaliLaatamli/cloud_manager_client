import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Provider } from './../../interfaces/provider';
import { ProvidersService } from './../../services/providers/providers.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';
import { AccountsService } from '../../services/accounts/accounts.service';
import { InstanceService } from '../../services/instances/instance.service';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-dash-tasks',
  templateUrl: './dash-tasks.component.html',
  styleUrls: ['./dash-tasks.component.css']
})
export class DashTasksComponent implements OnInit {

  providers$: Observable<Provider[]> ;
  accounts$: Observable<any> ;
  instances$: Observable<any>;
  tasks$: Observable<any>;
  currentProvider: Provider = null ;

  constructor(
    private providerService: ProvidersService ,
    private accountsService: AccountsService  ,
    private instanceService: InstanceService  ,
    private taskService: TasksService     ,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {

    this.loadProviders();

  }

  loadProviders(): void{
    this.providers$ = this.providerService.getProviders().pipe(
      catchError( err => {
        this.showError( err.error );
        return throwError(err);
      })
    );
  }

  selectProvider(provider): void {
    this.currentProvider = provider;
    this.loadAccounts();
  }

  selectAccount( accountChoosed ): void {
    // console.log( accountChoosed );
    this.getInstances( accountChoosed );
    this.getTasks( accountChoosed );
  }


  getInstances( accountId ){
    this.instances$ = this.instanceService.getInstances(accountId)
                            .pipe(
                            //  map( e => console.log( e ) ) ,
                              catchError( err => {
                                this.showError( err.error );
                                return throwError(err);
                              })
                            );
  }

  getTasks( accountId ){
    this.tasks$ = this.taskService.getTasks(accountId).pipe(
                              catchError( err => {
                                this.showError( err.error );
                                return throwError(err);
                              })
                            );

    this.tasks$.subscribe( e => console.log( e ) );
  }
  loadAccounts(): void{

    this.accounts$ = this.accountsService.getAccount( this.currentProvider.id ).pipe(
      catchError( err => {
        this.showError( err.error );
        return throwError(err);
      })
    );

  }


  deleteTask( taskId ): void {
    console.log( taskId )
  }
  showError( err ): void {
    this.toastr.error( err.message , err.error );
  }

}
