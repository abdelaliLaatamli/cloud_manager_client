import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any = null;

  constructor( private auth: AuthService ) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    // console.log( this.user )
  }

}
