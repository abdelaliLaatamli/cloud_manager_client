import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from './../../services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


declare var $: any;


@Component({
  selector: 'app-dash-users',
  templateUrl: './dash-users.component.html',
  styleUrls: ['./dash-users.component.css']
})

export class DashUsersComponent implements OnInit {

  users$: Observable<any[]>;
  formAddUser = new FormGroup( {
    email     : new FormControl( null , [ Validators.required , Validators.email ] ) ,
		username  : new FormControl( null , [ Validators.required , Validators.minLength(6) ] ) ,
		password  : new FormControl( null , [ Validators.required , Validators.minLength(8) , Validators.maxLength(14) ] ) ,
		systemId  : new FormControl( 12 )
  } );

  constructor( private userService: UsersService , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void{
      this.users$ = this.userService.loadUsers().pipe(
        catchError( err => {
          this.showError( err );
          return throwError(err);
        } )
      );

  }


  showAddUserModal(): void {
    $('#add-user-modal').modal('show');
  }

  submitForm(): void{

    this.userService.registerUser( this.formAddUser.value )
                      .subscribe( _ => {
                          $('#add-user-modal').modal('hide');
                          this.formAddUser.reset();
                          this.showSuccess( this.formAddUser.get('username').value , 'User Added' );  },
                         err => this.showError( err ) )
  }

  showSuccess( instance: string , message ): void {
    this.toastr.success( instance , message  );
  }

  showError( err ): void {
    this.toastr.error( err.message , err.error );
  }

}
