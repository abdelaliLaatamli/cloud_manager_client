import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Provider } from './../../interfaces/provider';
import { ProvidersService } from './../../services/providers/providers.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-dash-tasks',
  templateUrl: './dash-tasks.component.html',
  styleUrls: ['./dash-tasks.component.css']
})
export class DashTasksComponent implements OnInit {

  $providers: Observable<[Provider]> ;
  currentProvider: Provider = null ;

  constructor(
    private providerService: ProvidersService ,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {

    this.loadProviders();

  }

  loadProviders(): void{
    this.$providers = this.providerService.getProviders().pipe(
      catchError( err => {
        this.showError( err.error );
        return throwError(err);
      })
    );
  }

  showError( err ): void {
    this.toastr.error( err.message , err.error );
  }

}
