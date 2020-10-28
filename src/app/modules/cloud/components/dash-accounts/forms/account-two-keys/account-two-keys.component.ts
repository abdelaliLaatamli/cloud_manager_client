import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AccountOneKey } from 'src/app/modules/cloud/interfaces/account-one-key';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountTwoKeys } from './../../../../interfaces/account-two-keys';

@Component({
  selector: 'app-account-two-keys',
  templateUrl: './account-two-keys.component.html',
  styleUrls: ['./account-two-keys.component.css']
})
export class AccountTwoKeysComponent implements OnInit {


  @Input() account: AccountTwoKeys;

  @Output() setAccountToFatherEvent = new EventEmitter();

  accountForm = new FormGroup({
    id           : new FormControl( null ) ,
    name         : new FormControl( null , [ Validators.required ] ) ,
    proxy        : new FormControl( null ) ,
    sshKey       : new FormControl( null ) ,
    accessKey    : new FormControl( null ,  [ Validators.required ] ) ,
    secriteKey   : new FormControl( null ,  [ Validators.required ] ) ,
    accountType  : new FormControl( 1 , [ Validators.required ] )
  });


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.accountForm = new FormGroup({
      id           : new FormControl( this.account != null ? this.account.id : null ) ,
      name         : new FormControl( this.account != null ? this.account.name : null , [ Validators.required ] ) ,
      proxy        : new FormControl( null ) ,
      sshKey       : new FormControl( null ) ,
      accessKey    : new FormControl( this.account != null ? this.account.accessKey : null ,  [ Validators.required ] ) ,
      secriteKey   : new FormControl( this.account != null ? this.account.secriteKey : null ,  [ Validators.required ] ) ,
      accountType  : new FormControl( 1 , [ Validators.required ] )
    });

  }

  onSubmit(){
     //console.log( this.accountForm.value )
    this.setAccountToFatherEvent.emit(this.accountForm.value)
  }

}
