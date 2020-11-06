import { Component, OnInit , ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.css']
})
export class DashHomeComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  dataChart$: Observable<Array<any[]>>;
  dataProgress$: Observable<Array<any[]>>;
  dataTableInstances$: Observable<any>;


  constructor( private http: HttpClient ) {
    this.loadData()
   }

  ngOnInit(): void {

    this.loadChartDataFromBackend();
    this.loadBarDataFromBackEnd();
    this.loadInstanceTableDataFromBackEnd();
  }

  private async loadData() {
    this.chartOptions  =  {
      series: [
        {
          name: 'Instances',
          data: []
        }
      ],
      chart: {
        height: 350,
        width: '100%',
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: { type: 'datetime',  categories: [] },
      tooltip: { x: { format: 'dd/MM/yy HH:mm' } }
    };
  }

  loadChartDataFromBackend(): void{

    this.dataChart$ = this.http.get<Array<any[]>>( `${environment.apiUrl}/home/createdbyday` ).pipe(
      map( (datas: Array<any[]>) => {

        this.chartOptions.series[0].data = datas.map( item => item[0] );
        this.chartOptions.xaxis.categories = datas.map( item => item[1] );

        return datas;
      } )
    );

  }


  getClass( caraceterstique : string , index: number ) : string {

    const classes:string[] = [
      "-primary" ,
      "-success" ,
      "-info" ,
      "-warning" ,
      "-danger" ,
      "-secondary" ,
      "-dark" ,
    ];

    return caraceterstique + classes[index];
  }

loadBarDataFromBackEnd(): void{
  this.dataProgress$ = this.http.get<Array<any[]>>( `${environment.apiUrl}/home/numberAccounts` );
}


loadInstanceTableDataFromBackEnd():void{
  this.dataTableInstances$ = this.http.get<Array<any[]>>( `${environment.apiUrl}/home/instancesByAccount` )
  .pipe(
    map( (datas: Array<any[]>) => {
      // console.log( datas )
      return datas;
    } )
  );
}


calculePercent(dataProgress: any[] , dataProgresses: any[][]): string {

  let sum: number = 0 ;
  dataProgresses.map( item => sum += item[0] );
  return `width: ${Math.round(dataProgress[0] / sum * 100)}%`;
}


calculePercentNumber( dataProgress: any[] , dataProgresses: any[][] ):number{
  let sum: number = 0 ;
  dataProgresses.map( item => sum += item[0] );
  return Math.round(dataProgress[0] / sum * 100);
}
  public generateData(baseval, count, yrange) {
    let i = 0;
    let series = [];
    while (i < count) {
      const x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

}
