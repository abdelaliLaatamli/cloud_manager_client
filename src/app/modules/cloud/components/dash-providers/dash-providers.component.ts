import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ProvidersService } from './../../services/providers/providers.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-dash-providers',
  templateUrl: './dash-providers.component.html',
  styleUrls: ['./dash-providers.component.css']
})
export class DashProvidersComponent implements OnInit {


  $providers: Observable<any> ;

  constructor( private providerService: ProvidersService , private toastr: ToastrService ) { }

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
