import { Component, OnInit, Input } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Provider } from './../../../interfaces/provider';
import { catchError } from 'rxjs/operators';
import { AccountsService } from './../../../services/accounts/accounts.service';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../../../interfaces/account';
import { InstanceService } from './../../../services/instances/instance.service';

declare var $ ;

@Component({
  selector: 'app-digitalocean',
  templateUrl: './digitalocean.component.html',
  styleUrls: ['./digitalocean.component.css']
})
export class DigitaloceanComponent implements OnInit {

  @Input() provider: Provider;
  $acconts: Observable<Account>;
  $instances:Observable<any>;
  accountId: number = -1;


  constructor(
    private accountService: AccountsService ,
    private instanceService: InstanceService ,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
   // console.log( this.provider.accounts );
    this.loadAccounts();
  }


  loadAccounts( ):void{
    this.$acconts = this.accountService.getAccount( this.provider.id ).pipe(
      catchError( err => {
        this.showError( err.error )
        return throwError(err);
      })
    )
  }
  showError( err ):void {
    this.toastr.error( err.message , err.error );
  }

  getServers( ){

    this.$instances = this.instanceService.getInstances(this.accountId)//.subscribe(e => console.log( e ))

    this.$instances.subscribe(e => console.log( e ))

    console.log( this.accountId )

  }

  addInstances(){
    $("#addInstance").modal('show')
  }

  editVmta(instance){
      console.log( instance )

      $("#editVmta").modal('show')
  }

}
