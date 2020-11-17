import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Provider } from './../../interfaces/provider';
import { ProvidersService } from './../../services/providers/providers.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';
import { AccountsService } from '../../services/accounts/accounts.service';
import { InstanceService } from '../../services/instances/instance.service';
import { TasksService } from '../../services/tasks/tasks.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var $: any;

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
  accountChoosed: number;
  accountId: number = -1;

  formAddTask = new FormGroup( {

    delayBetween : new FormControl( null , [ Validators.required ] ) ,
		operationType : new FormControl( 3 , [ Validators.required ] ) ,
		instance : new FormControl( null , [ Validators.required ] )

  } );

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

  selectAccount( ): void {
    this.accountChoosed = this.accountId ;
    this.getInstances( this.accountChoosed );
    this.getTasks( this.accountChoosed );
  }


  getInstances( accountId ): void {
    this.instances$ = this.instanceService.getInstances(accountId)
                            .pipe(
                              catchError( err => {
                                this.showError( err.error );
                                return throwError(err);
                              })
                            );
  }

  getTasks( accountId ): void{
    this.tasks$ = this.taskService.getTasks(accountId).pipe(
                              catchError( err => {
                                this.showError( err.error );
                                return throwError(err);
                              })
                            );

    // this.tasks$.subscribe( e => console.log( e ) );
  }
  loadAccounts(): void{

    this.accounts$ = this.accountsService.getAccount( this.currentProvider.id ).pipe(
      catchError( err => {
        this.showError( err.error );
        return throwError(err);
      })
    );

  }

  addTask(): void {

    this.taskService.addTask( this.formAddTask.value ).subscribe(
        task => {

            this.showSuccess(  task.instance.name , 'success add task' ) ;
            this.getTasks( this.accountChoosed );
            this.formAddTask.reset();
            $('#modal-add-cron').modal('hide');
        },
      err =>  this.showError( err.error )
    );

  }


  startTask(task): void {
      this.taskService.updateTask( task.id , 'start' ).subscribe(
        _ => {
              this.showSuccess(  task.instance.name , 'success started task' ) ;
              this.getTasks( this.accountChoosed );
          },
        err =>  this.showError( err.error )
      );
  }

  stopTask(task): void{
    this.taskService.updateTask( task.id , 'stop' ).subscribe(
      _ => {
            this.showSuccess(  task.instance.name , 'success stoped task' ) ;
            this.getTasks( this.accountChoosed );
        },
      err =>  this.showError( err.error )
    );
  }

  deleteTask( task ): void {

    this.taskService.deleteTask( task.id ).subscribe(
      _ => {
            this.showSuccess(  task.instance.name , 'success delete task' ) ;
            this.getTasks( this.accountChoosed );
        },
      err =>  this.showError( err.error )
    );

  }

  showSuccess( instance: string , message ): void {
    this.toastr.success( instance , message  );
  }


  showError( err ): void {
    this.toastr.error( err.message , err.error );
  }

  showAddCronModal(): void{
    $('#modal-add-cron').modal('show');
  }

}
