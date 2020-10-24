import { Component, OnInit } from '@angular/core';
import { fromEvent } from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showSidebare : boolean = false ;
  isMobile : boolean = false ;


  constructor() { }

  ngOnInit(): void {
      this.checkSize()
      fromEvent(window, 'resize').subscribe( eve => this.checkSize() )
  }

  checkSize(){
    this.isMobile = window.innerWidth < 768 
    if( !this.isMobile ) this.showSidebare = true ;
  }


  

}
