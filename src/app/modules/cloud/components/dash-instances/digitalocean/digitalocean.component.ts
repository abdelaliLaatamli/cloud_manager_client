import { Component, OnInit, Input } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Provider } from './../../../interfaces/provider';
import { catchError, map, tap } from 'rxjs/operators';
import { AccountsService } from './../../../services/accounts/accounts.service';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../../../interfaces/account';
import { InstanceService } from './../../../services/instances/instance.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InstanceDB } from './../../../interfaces/instance';

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

  regions = [
    { name: "New York 1"      , slug: "nyc1" },
    { name: "San Francisco 1" , slug: "sfo1" },
    { name: "Amsterdam 2"     , slug: "ams2" },
    { name: "Singapore 1"     , slug: "sgp1" },
    { name: "London 1"        , slug: "lon1" },
    { name: "New York 3"      , slug: "nyc3" },
    { name: "Amsterdam 3"     , slug: "ams3" },
    { name: "Frankfurt 1"     , slug: "fra1" },
    { name: "Toronto 1"       , slug: "tor1" },
    { name: "San Francisco 2" , slug: "sfo2" },
    { name: "Bangalore 1"     , slug: "blr1" },
    { name: "San Francisco 3" , slug: "sfo3" }
  ];

  addInstanceForm = new FormGroup({

    name: new FormControl(null),
    vmtaDomain:  new FormControl(null , [Validators.required ,  Validators.pattern("[a-zA-Z0-9$\.{1}]{1}[a-zA-Z0-9$\.?]+")]),
    numberInstances:  new FormControl(null),
    region:  new FormControl(1)
  });

  instanceForm = new FormGroup({
    id: new FormControl(null) ,
    instanceId: new FormControl(null),
    name: new FormControl(null),
    vmtaDomain:  new FormControl(null , [Validators.required ,  Validators.pattern("[a-zA-Z0-9$\.{1}]{1}[a-zA-Z0-9$\.?]+")]),
    mainIp:  new FormControl(null),
    isInstalled:  new FormControl(null),
    isDeleted:  new FormControl(null),
    createdAt:  new FormControl(null),
    deletedAt:  new FormControl(null),
    ipStatus :  new FormControl(null),
  });


  constructor(
    private accountService: AccountsService ,
    private instanceService: InstanceService ,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.loadAccounts();
  }


  loadAccounts(): void{
    this.$acconts = this.accountService.getAccount( this.provider.id ).pipe(
      catchError( err => {
        this.showError( err.error )
        return throwError(err);
      })
    )

  }


  showSuccess( instance: InstanceDB , message ): void {
    this.toastr.success( instance.name , message  );
  }

  showError( err ): void {
    this.toastr.error( err.message , err.error );
  }

  getServers(){
    this.$instances = this.instanceService.getInstances(this.accountId)
    //this.$instances.subscribe( e => console.log( e ) )
  }

  addInstancesShowModal(){
    $("#addInstance").modal('show')
  }

  addInstance(){

    this.instanceService.addInstance( this.addInstanceForm.value , this.accountId )
      .subscribe( (instances: any[]) =>  {
        $("#addInstance").modal('hide');
        this.getServers( );
        instances.map( instance => this.showSuccess( instance , "Instance Added" ) )
      }  , err => this.showError( err.error ) )
  }

  updateVmta(){

    this.instanceService.updateVmta( this.instanceForm.value )
                        .subscribe((instance : InstanceDB) => {
                          $("#editVmta").modal('hide');
                          this.getServers( );
                          this.showSuccess( instance , "Instance updated" )
                        }  , err => this.showError( err.error ) )


  }

  editVmta(instance){

      this.instanceForm = new FormGroup({
        id: new FormControl(null) ,
        instanceId: new FormControl(instance.id),
        name: new FormControl(instance.name),
        vmtaDomain:  new FormControl(null , [Validators.required ,  Validators.pattern("[a-zA-Z0-9$\.{1}]{1}[a-zA-Z0-9$\.?]+")]),
        mainIp:  new FormControl(instance.networks.v4[1].ip_address),
        isInstalled:  new FormControl(null),
        isDeleted:  new FormControl(null),
        createdAt:  new FormControl(null),
        deletedAt:  new FormControl(null),
        ipStatus :  new FormControl(null),
      })

      $("#editVmta").modal('show')
  }


  deleteInstance(instance){

    this.instanceService.deleteInstance( instance.id , this.accountId )
                        .subscribe((e) => {
                          this.getServers( );
                          this.showSuccess( instance , "Instance Deleted" )
                        }  , err => this.showError( err.error ) )

  }

  installServer(instance){
    // console.log( instance )
    const response = this.instanceService.installInsance( instance )

    if ( response.code === 200 ) {  this.showSuccess( instance , 'Instance installed' ); }
    else { this.showError( {  message : response.message , error : `Faild install instance ${instance.name}`  } ); }

    if ( response.db != null ){
        response.db.subscribe((e) => {
           //console.log(e);
           this.getServers( );
           this.showSuccess( instance , ' installation Status Saved' );
        }  , err => this.showError( err.error ) );
    }
  }

  stopInstance(instance): void {

    this.instanceService.updateOptionInstance( instance.id , this.accountId , "stop").subscribe(
        e => {
          this.getServers( );
          this.showSuccess( instance , ' Instance stoping' );
        } ,
        err => this.showError( err.error )
    )

  }

  startInstance(instance){

    this.instanceService.updateOptionInstance( instance.id , this.accountId , "start").subscribe(
      e => {
        this.getServers( );
        this.showSuccess( instance , ' Instance starting' );
      } ,
      err => this.showError( err.error )
  );

  }

   range = ( end , start = 0 ): number[] => [...Array(end - start + 1)].map((_, i) => start + i);
}
