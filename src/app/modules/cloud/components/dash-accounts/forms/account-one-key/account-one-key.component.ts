import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountOneKey } from './../../../../interfaces/account-one-key';

@Component({
  selector: 'app-account-one-key',
  templateUrl: './account-one-key.component.html',
  styleUrls: ['./account-one-key.component.css']
})
export class AccountOneKeyComponent implements OnInit {


  @Input() account: AccountOneKey;

  @Output() setAccountToFatherEvent = new EventEmitter();

  accountForm = new FormGroup({
    id           : new FormControl( null ) ,
    name         : new FormControl( null , [ Validators.required ] ) ,
    proxy        : new FormControl( null ) ,
    sshKey       : new FormControl( null ) ,
    token        : new FormControl( null ,  [ Validators.required ] ) ,
    accountType  : new FormControl( 0 , [ Validators.required ] )
  });

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {


    this.accountForm = new FormGroup({
      id           : new FormControl( this.account != null ? this.account.id : null  ) ,
      name         : new FormControl( this.account != null ? this.account.name : null  , [ Validators.required ] ) ,
      proxy        : new FormControl( null ) ,
      sshKey       : new FormControl( null ) ,
      token        : new FormControl( this.account != null ? this.account.token : null ,  [ Validators.required ] ) ,
      accountType  : new FormControl( 0 , [ Validators.required ] )
    });

  }


  onSubmit(){
    // console.log( this.accountForm.value )
    this.setAccountToFatherEvent.emit(this.accountForm.value)
  }

}
