import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountForKeys } from './../../../../interfaces/account-for-keys';

@Component({
  selector: 'app-account-four-keys',
  templateUrl: './account-four-keys.component.html',
  styleUrls: ['./account-four-keys.component.css']
})
export class AccountFourKeysComponent implements OnInit {

  @Input() account: AccountForKeys;

  @Output() setAccountToFatherEvent = new EventEmitter();

  accountForm = new FormGroup({
    id           : new FormControl( null ) ,
    name         : new FormControl( null , [ Validators.required ] ) ,
    accessKey    : new FormControl( null , [ Validators.required ] ) ,
    proxy        : new FormControl( null ) ,
    secriteKey   : new FormControl( null , [ Validators.required ] ) ,
    subscription : new FormControl( null , [ Validators.required ] ) ,
    tenant       : new FormControl( null , [ Validators.required ] ) ,
    accountType  : new FormControl( 2 , [ Validators.required ] )
  });


  constructor() { }

  ngOnInit(): void {
    // console.log( this.account )


  }
  ngOnChanges(changes: SimpleChanges): void {

      this.accountForm = new FormGroup({
        id           : new FormControl( this.account != null ? this.account.id : null ) ,
        name         : new FormControl( this.account != null ? this.account.name : null         , [ Validators.required ] ) ,
        accessKey    : new FormControl( this.account != null ? this.account.accessKey : null    , [ Validators.required ] ) ,
        proxy        : new FormControl( null ) ,
        secriteKey   : new FormControl( this.account != null ? this.account.secriteKey : null   , [ Validators.required ] ) ,
        subscription : new FormControl( this.account != null ? this.account.subscription : null , [ Validators.required ] ) ,
        tenant       : new FormControl( this.account != null ? this.account.tenant : null       , [ Validators.required ] ) ,
        accountType  : new FormControl( 2 , [ Validators.required ] )
      });
  }

  onSubmit(){

    //console.log( this.accountForm.value )
    this.setAccountToFatherEvent.emit(this.accountForm.value)

  }

}
