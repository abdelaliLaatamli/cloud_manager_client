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
  emailReadOnly = false ;
  isEditOperation=false;
  changePassword=false;

  formAddUser = new FormGroup( {
    id        : new FormControl( null ) ,
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
    this.formAddUser.reset();
    this.emailReadOnly = false;
    this.isEditOperation = false ;
    this.formAddUser = new FormGroup( {
      id        : new FormControl( null ) ,
      email     : new FormControl( null , [ Validators.required , Validators.email ] ) ,
      username  : new FormControl( null , [ Validators.required , Validators.minLength(6) ] ) ,
      password  : new FormControl( null , [ Validators.required , Validators.minLength(8) , Validators.maxLength(14) ] ) ,
      systemId  : new FormControl( 12 )
    } );
    $('#add-user-modal').modal('show');
  }

  submitForm(): void{
    if( this.isEditOperation ){
      console.log( this.changePassword , this.formAddUser.value )

      this.userService.updateUser( this.formAddUser.value  , this.changePassword )
                        .subscribe( _ => {
                            $('#add-user-modal').modal('hide');
                            this.formAddUser.reset();
                            this.loadUsers();
                            this.showSuccess( this.formAddUser.get('username').value , 'User Added' );  },
                            err => this.showError( err ) )


    }else{
      this.userService.registerUser( this.formAddUser.value )
                        .subscribe( _ => {
                            $('#add-user-modal').modal('hide');
                            this.formAddUser.reset();
                            this.loadUsers();
                            this.showSuccess( this.formAddUser.get('username').value , 'User Added' );  },
                           err => this.showError( err ) )
    }

  }

  showSuccess( instance: string , message ): void {
    this.toastr.success( instance , message  );
  }

  showError( err ): void {
    this.toastr.error( err.message , err.error );
  }

  editUser(user): void {

      this.formAddUser.reset();
      this.emailReadOnly = true;
      this.formAddUser = new FormGroup( {
        id     : new FormControl( user.id ) ,
        email     : new FormControl( user.email , [ Validators.required , Validators.email ] ) ,
        username  : new FormControl( user.username , [ Validators.required , Validators.minLength(6) ] ) ,
        password  : new FormControl( null , [ Validators.minLength(8) , Validators.maxLength(14) ] ) ,
        systemId  : new FormControl( 12 )
      } );

      this.emailReadOnly   = true;
      this.isEditOperation = true ;

      $('#add-user-modal').modal('show');

  }

}
