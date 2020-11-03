import { Component, OnInit, Input } from '@angular/core';
import { Provider } from '../../../interfaces/provider';
import { Observable, throwError } from 'rxjs';
import { AccountsService } from '../../../services/accounts/accounts.service';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vultr',
  templateUrl: './vultr.component.html',
  styleUrls: ['./vultr.component.css']
})
export class VultrComponent implements OnInit {

  @Input() provider: Provider;
  $acconts: Observable<Account>;
  $instances: Observable<any>;
  accountId: number = -1;

  constructor( private accountsService : AccountsService , private toastr: ToastrService ) { }

  ngOnInit(): void {

  }


  loadAccounts(): void{
    this.$acconts = this.accountsService.getAccount( this.provider.id ).pipe(
      catchError( err => {
        this.showError( err.error )
        return throwError(err);
      })
    )

  }

  showError( err ): void {
    this.toastr.error( err.message , err.error );
  }


}
