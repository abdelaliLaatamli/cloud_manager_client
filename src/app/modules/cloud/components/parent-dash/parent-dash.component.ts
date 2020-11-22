import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AuthService } from './../../../../services/auth/auth.service';

@Component({
  selector: 'app-parent-dash',
  templateUrl: './parent-dash.component.html',
  styleUrls: ['./parent-dash.component.css']
})
export class ParentDashComponent implements OnInit {

  showSidebare: boolean = true ;
  isMobile: boolean = false ;
  user: any = null;

  constructor( private auth: AuthService ) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.checkSize();
    fromEvent(window, 'resize').subscribe( eve => this.checkSize() );
  }

  checkSize(): void {
    this.isMobile = window.innerWidth < 768 ;
    if ( !this.isMobile ){ this.showSidebare = true ; }
  }


  logout(): void{
    this.auth.logout();
  }


}
