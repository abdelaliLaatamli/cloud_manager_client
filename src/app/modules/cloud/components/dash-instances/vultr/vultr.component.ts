import { Component, OnInit, Input } from '@angular/core';
import { Provider } from '../../../interfaces/provider';
import { Observable, throwError } from 'rxjs';
import { AccountsService } from '../../../services/accounts/accounts.service';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { InstanceService } from '../../../services/instances/instance.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InstanceDB } from '../../../interfaces/instance';

declare var $ ;
@Component({
  selector: 'app-vultr',
  templateUrl: './vultr.component.html',
  styleUrls: ['./vultr.component.css']
})
export class VultrComponent implements OnInit {

  @Input() provider: Provider;
  $accounts: Observable<Account>;
  $instances: Observable<any>;
  accountId = -1;

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

  regions = [

    { name: "US New Jersey"      , slug: "1"  },
    { name: "US Chicago"         , slug: "2"  },
    { name: "US Dallas"          , slug: "3"  },
    { name: "US Seattle"         , slug: "4"  },
    { name: "US Los Angeles"     , slug: "5"  },
    { name: "US Atlanta"         , slug: "6"  },
    { name: "NL Amsterdam"       , slug: "7"  },
    { name: "UK London"          , slug: "8"  },
    { name: "DE Frankfurt"       , slug: "9"  },
    { name: "US Silicon Valley"  , slug: "12" },
    { name: "CA Toronto"         , slug: "22" },
    { name: "FR Paris"           , slug: "24" },
    { name: "JP Tokio"           , slug: "25" },
    { name: "US Miami"           , slug: "39" },
    { name: "SG Singapore"       , slug: "40" },

  ];

  constructor(
    private accountsService: AccountsService ,
    private instanceService: InstanceService ,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
      this.loadAccounts();
  }


  loadAccounts(): void{

    this.$accounts = this.accountsService.getAccount( this.provider.id ).pipe(
      map( e => console.log( e ) ) ,
      catchError( err => {
        this.showError( err.error )
        return throwError(err);
      })
    )

  }

  showError( err ): void {
    this.toastr.error( err.message , err.error );
  }

  getServers(){
    this.$instances = this.instanceService.getInstances(this.accountId)
                            .pipe(
                              catchError( err => {
                                this.showError( err.error )
                                return throwError(err);
                              })
                            )
    this.$instances.subscribe( e => console.log( e ) )
  }

  addInstancesShowModal(){
    $("#addInstance").modal('show')
  }



  editVmta(instance){

    this.instanceForm = new FormGroup({
      id: new FormControl(null) ,
      instanceId: new FormControl(instance.id),
      name: new FormControl(instance.name),
      vmtaDomain:  new FormControl(null , [Validators.required ,  Validators.pattern("[a-zA-Z0-9$\.{1}]{1}[a-zA-Z0-9$\.?]+")]),
      mainIp:  new FormControl(instance.main_ip),
      isInstalled:  new FormControl(null),
      isDeleted:  new FormControl(null),
      createdAt:  new FormControl(null),
      deletedAt:  new FormControl(null),
      ipStatus :  new FormControl(null),
    })

    $("#editVmta").modal('show')
  }

  updateVmta(){

    this.instanceService.updateVmta( this.instanceForm.value )
                        .subscribe((instance : InstanceDB) => {
                          $("#editVmta").modal('hide');
                          this.getServers( );
                          this.showSuccess( instance , "Instance updated" )
                        }  , err => this.showError( err.error ) )


  }

  addInstance(){

    this.instanceService.addInstance( this.addInstanceForm.value , this.accountId )
      .subscribe( (instances: any[]) =>  {
        $("#addInstance").modal('hide');
        this.getServers( );
        //instances.map( instance => this.showSuccess( instance , "Instance Added" ) )
      }  , err => this.showError( err.error ) )
  }



  showSuccess( instance: InstanceDB , message ): void {
    this.toastr.success( instance.name , message  );
  }


  range = ( end , start = 0 ): number[] => [...Array(end - start + 1)].map((_, i) => start + i);
}
