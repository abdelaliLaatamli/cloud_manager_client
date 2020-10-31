import { Component, OnInit, Input } from '@angular/core';
import { Provider } from './../../../interfaces/provider';

@Component({
  selector: 'app-digitalocean',
  templateUrl: './digitalocean.component.html',
  styleUrls: ['./digitalocean.component.css']
})
export class DigitaloceanComponent implements OnInit {

  @Input() provider: Provider;

  accountId: number =-1;


  constructor() { }

  ngOnInit(): void {
  }

}
