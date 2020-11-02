import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    email : new FormControl(null , [ Validators.required , Validators.email ]) ,
    password : new FormControl( null , [ Validators.required , Validators.minLength(8) , Validators.maxLength(12) ])
  })

  constructor( private auth : AuthService ) { }

  ngOnInit(): void {
  }


  login(){
    this.auth.login( this.loginForm.value ).subscribe( res => { /*console.log( res )*/ } , err => console.log( err ))
  }

}
