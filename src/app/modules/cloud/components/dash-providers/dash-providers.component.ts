import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ProvidersService } from './../../services/providers/providers.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs/operators';
import { EntitiesService } from './../../services/entities/entities.service';


@Component({
  selector: 'app-dash-providers',
  templateUrl: './dash-providers.component.html',
  styleUrls: ['./dash-providers.component.css']
})
export class DashProvidersComponent implements OnInit {


  $providers: Observable<any> ;
  currentProvider=null;
  entities$: Observable<any[]>
  attchingMode: boolean=false;

  constructor(
    private providerService: ProvidersService ,
    private entitiesService: EntitiesService ,
    private toastr: ToastrService ) { }

  ngOnInit(): void {

    this.loadProviders();
    this.loadEntities();
  }

  loadProviders(): void {

    this.$providers = this.providerService.getProviders().pipe(
      catchError( err => {
        this.showError( err.error );
        return throwError(err);
      })
    );

  }

  chooseProvider(provider): void{
    this.currentProvider = provider;
  }

  loadEntities(): void {
    this.entities$ = this.entitiesService.getEntities();//.pipe( map( e => { console.log( e ) ; return e; } ) );
  }


  showError( err ): void {
    this.toastr.error( err.message , err.error );
  }


  showSuccess( provider , message ): void {
    this.toastr.success( provider.name , message  );
  }


  attachEntity( entityId): void {
    this.providerService.providerlinkActions(  entityId , this.currentProvider.id , 'attach').subscribe( e=>{
      this.showSuccess(e , 'Entity Attached');
      this.loadProviders();
      this.currentProvider = null;
      this.attchingMode = false;
    }, err => this.showError(err) );

  }

  dettachEntity(entityId , providerId ): void {

    this.providerService.providerlinkActions(  entityId , this.currentProvider.id , 'detach').subscribe( e => {
      this.showSuccess(e , 'Entity Deattached');
      this.loadProviders();
      this.currentProvider = null;
      this.attchingMode = false;
    }, err => this.showError(err) );

  }




}
