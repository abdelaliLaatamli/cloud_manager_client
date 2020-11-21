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
  accounts$;
  $instances: Observable<any>;
  accountId = -1;

  addInstanceForm = new FormGroup({
    name: new FormControl(null),
    vmtaDomain:  new FormControl(null , [Validators.required ,  Validators.pattern('[a-zA-Z0-9$\.{1}]{1}[a-zA-Z0-9$\.?]+')]),
    numberInstances:  new FormControl(null),
    region:  new FormControl(1)
  });


  instanceForm = new FormGroup({
    id: new FormControl(null) ,
    instanceId: new FormControl(null),
    name: new FormControl(null),
    vmtaDomain:  new FormControl(null , [Validators.required ,  Validators.pattern('[a-zA-Z0-9$\.{1}]{1}[a-zA-Z0-9$\.?]+')]),
    mainIp:  new FormControl(null),
    isInstalled:  new FormControl(null),
    isDeleted:  new FormControl(null),
    createdAt:  new FormControl(null),
    deletedAt:  new FormControl(null),
    ipStatus :  new FormControl(null),
  });

  regions = [

    { slug : 'ams' , name : 'NL Amsterdam'      },
    { slug : 'atl' , name : 'US Atlanta'        },
    { slug : 'cdg' , name : 'FR Paris'          },
    { slug : 'dfw' , name : 'US Dallas'         },
    { slug : 'ewr' , name : 'US New Jersey'     },
    { slug : 'fra' , name : 'DE Frankfurt'      },
    { slug : 'icn' , name : 'KR Seoul'          },
    { slug : 'lax' , name : 'US Los Angeles'    },
    { slug : 'lhr' , name : 'UK London'         },
    { slug : 'mia' , name : 'US Miami'          },
    { slug : 'nrt' , name : 'JP Tokyo'          },
    { slug : 'ord' , name : 'US Chicago'        },
    { slug : 'sea' , name : 'US Seattle'        },
    { slug : 'sgp' , name : 'SG Singapore'      },
    { slug : 'sjc' , name : 'US Silicon Valley' },
    { slug : 'syd' , name : 'AU Sydney'          },
    { slug : 'yto' , name : 'CA Toronto'         }

  ];

  constructor(
    private accountsService: AccountsService ,
    private instanceService: InstanceService ,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
      // console.log( this.provider);
      this.loadAccounts();
  }


  loadAccounts(): void{

    this.accounts$ = this.accountsService.getAccounts( this.provider.id ).pipe(
    // map( e => {console.log( e ); return e;}) ,
      catchError( err => {
        this.showError( err.error );
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
                             // map( e => console.log( e ) ) ,
                              catchError( err => {
                                this.showError( err.error );
                                return throwError(err);
                              })
                            );
    // this.$instances.subscribe( e => console.log( e ) )
  }

  addInstancesShowModal(): void{
    $('#addInstance').modal('show');
  }



  editVmta(instance): void {

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
    });

    $('#editVmta').modal('show');
  }

  updateVmta(): void{

    this.instanceService.updateVmta( this.instanceForm.value )
                        .subscribe((instance) => {
                          $('#editVmta').modal('hide');
                          this.getServers( );
                          this.showSuccess( instance.name , 'Instance updated' );
                        }  , err => this.showError( err.error ) );


  }

  addInstance(): void{

    this.instanceService.addInstance( this.addInstanceForm.value , this.accountId )
      .subscribe( (instances: any[]) =>  {
        $('#addInstance').modal('hide');
        this.getServers( );
        instances.map( instance => this.showSuccess( instance.label , 'Instance Added' ) );
      }  , err => this.showError( err.error ) );
  }



  showSuccess( instance: string , message ): void {
    this.toastr.success( instance , message  );
  }


  deleteInstance(instance): void{


    this.instanceService.deleteInstance( instance.id , this.accountId )
                        .subscribe((e) => {
                          this.getServers( );
                          this.showSuccess( instance.label , 'Instance Deleted' );
                        }  , err => this.showError( err.error ) );

  }

  stopInstance(instance): void {

    this.instanceService.updateOptionInstance( instance.id , this.accountId , 'stop' ).subscribe(
        e => {
          this.getServers( );
          this.showSuccess( instance.label , 'Instance stoping' );
        } ,
        err => this.showError( err.error )
    );

  }

  startInstance(instance): void{

    this.instanceService.updateOptionInstance( instance.id , this.accountId , 'start' ).subscribe(
      e => {
        this.getServers( );
        this.showSuccess( instance.label , 'Instance starting' );
      } ,
      err => this.showError( err.error )
  );

  }



  installServer(instance): void {

    const instanceRequest: InstanceDB = {

      instanceId  : instance.id ,
      name        : instance.label ,
      vmtaDomain  : instance.database.vmtaDomain ,
      mainIp      : instance.main_ip ,
      isInstalled : true
    };

    const response = this.instanceService.installInsance( instanceRequest );


    if ( response.code === 200 ) {  this.showSuccess( instance.label  , 'Instance installed' ); }
    else { this.showError( {  message : response.message , error : `Faild install instance ${instance.name}`  } ); }

    if ( response.db != null ){
        response.db.subscribe((e) => {
           this.getServers( );
           this.showSuccess( instance.label  , ' installation Status Saved' );
        }  , err => this.showError( err.error ) );
    }
  }


  range = ( end , start = 0 ): number[] => [...Array(end - start + 1)].map((_, i) => start + i);
}
