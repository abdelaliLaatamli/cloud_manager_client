import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProvidersService } from './../../services/providers/providers.service';

@Component({
  selector: 'app-dash-providers',
  templateUrl: './dash-providers.component.html',
  styleUrls: ['./dash-providers.component.css']
})
export class DashProvidersComponent implements OnInit {


  $providers : Observable<any> ;

  constructor( private providerService : ProvidersService ) { }

  ngOnInit(): void {
    this.$providers = this.providerService.getProviders()
    this.$providers.subscribe( res => console.log(res) , err => console.log( err ) )
  }





}
