import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { ProvidersService } from '../../services/providers/providers.service';
import { catchError } from 'rxjs/operators';
import { Provider } from './../../interfaces/provider';

@Component({
  selector: 'app-dash-instances',
  templateUrl: './dash-instances.component.html',
  styleUrls: ['./dash-instances.component.css']
})
export class DashInstancesComponent implements OnInit {


  $providers: Observable<[Provider]> ;

  currentProvider: Provider = null ;

  constructor(
      private providerService: ProvidersService ,
      private toastr: ToastrService
    ) { }

  ngOnInit(): void {

    this.$providers = this.providerService.getProviders().pipe(
      catchError( err => {
        this.showError( err.error )
        return throwError(err);
      })
    )
  }


  showError( err ):void {
    this.toastr.error( err.message , err.error );
  }


}
