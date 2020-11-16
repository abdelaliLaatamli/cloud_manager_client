import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { StatsService } from '../../services/stats/stats.service';
import { catchError, map } from 'rxjs/operators';

import {
    ApexAxisChartSeries,
    ApexDataLabels,
    ApexFill,
    ApexLegend,
    ApexPlotOptions,
    ApexStroke,
    ApexTooltip,
    ApexXAxis,
    ApexYAxis,
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart,
    ApexMarkers,
    ApexGrid
 } from "ng-apexcharts";
import { ToastrService } from 'ngx-toastr';


export type ChartOptionsDonut = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type ChartOptionsColumn  = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

export type ChartOptionsLineColumnArea = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
};


export type ChartOptionsDistributedColumns = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};


@Component({
  selector: 'app-dash-stats',
  templateUrl: './dash-stats.component.html',
  styleUrls: ['./dash-stats.component.css']
})
export class DashStatsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptionsDonut: Partial<ChartOptionsDonut>;
  public chartOptionsColumn: Partial<ChartOptionsColumn>;
  public chartOptionsLineColumnArea: Partial<ChartOptionsLineColumnArea>;
  public chartOptionsDistributedColumns: Partial<ChartOptionsDistributedColumns>;

  user$: Observable<any>;
  instancesOfProvider$: Observable<any>;
  instancesOfEntity$: Observable<any>;
  instancesOfAccount$: Observable<any>;
  instancesOfEntities$: Observable<any>;


  constructor( private states: StatsService , private toastr: ToastrService ) {
    this.loadDonutChart();
    this.loadDonutColumn();
    this.loadDonutLineColumnArea();
    this.loadLineColumnArea();
  }

  ngOnInit(): void {
    this.loadusersData();
    this.loadInstnacesOfProviderData();
    this.loadInstnacesOfEntityData();
    this.loadInstancesOfAccountData();
    this.loadInstancesOfEntitiesData();
  }

  loadusersData(): void {
    this.user$ = this.states.loadUsersData().pipe(
      catchError( err => {
        this.showError( err );
        return throwError( err );
      } )
    );
  }

  loadInstnacesOfProviderData(): void {
    this.instancesOfProvider$ = this.states.loadInstnacesOfProviderData().pipe(
      map( elemts => {
        this.chartOptionsDonut.series = elemts.map( item=> item[1] );
        this.chartOptionsDonut.labels = elemts.map( item => item[0][0].toUpperCase() + item[0].substr(1).toLowerCase() );
        return elemts;
      }),
      catchError( err => {
        this.showError( err );
        return throwError(err);
      } )
    );

  }


  loadInstnacesOfEntityData(): void {

    this.instancesOfEntity$ = this.states.loadInstnacesOfEntity().pipe(
      map( elemts => {

        const series = [];
        for ( let i = 1 ; i <= 12 ; i++ ){
          elemts[i].map( ents => {
              let indexs = -1 ;

              series.map( ( serie , key ) => {
                if ( serie.name === ents[0] ) { indexs = key; }
              });
              if ( indexs === -1 ){
                series.push({ name : ents[0] , data : [ ents[1] ] });
              } else {
                series[indexs].data.push(ents[1]);
              }

          } );
        }

        this.chartOptionsColumn.series = series ;

        return elemts;
      }),
      catchError( err => {
        this.showError( err );
        return throwError(err);
      } )
    );

  }

  loadInstancesOfAccountData(): void{
    this.instancesOfAccount$ = this.states.loadInstancesOfAccount().pipe(
      map( elemts => {

        this.chartOptionsDistributedColumns.series[0].data = elemts.map( eps => eps[0] )
        this.chartOptionsDistributedColumns.xaxis.categories = elemts.map( eps => [ eps[1].replace(/@.*/gi, '') , eps[2] ] )
        return elemts ;
      } ),
      catchError( err => {
        this.showError( err );
        return throwError(err);
      } )
    );

  }
  loadInstancesOfEntitiesData(): void {
    this.instancesOfEntities$ = this.states.loadInstancesOfEntitiesData().pipe(
      map( elemts => {

        // console.log( elemts )

        let types = [
          "column",
          "area" ,
          "line" ,

        ];
        let ic = 0 ;
        const series = [];
        for ( let i = 1 ; i <= 12 ; i++ ){
          elemts[i].map( ents => {

              let indexs = -1 ;

              series.map( ( serie , key ) => {
                if ( serie.name === ents[0] ) { indexs = key; }
              });
              if ( indexs === -1 ){

                series.push({ name : ents[0] , type: types[ic] , data : [ ents[1] ] });
                ic++;
                if( ic == types.length  ) ic=0;
              } else {
                series[indexs].data.push(ents[1]);
              }

          } );
        }
        // console.log( series )
        this.chartOptionsLineColumnArea.series = series ;

        return elemts;
      }),
      catchError( err => {
        this.showError( err );
        return throwError(err);
      } )
    );
  }

  showError( err ): void {
    this.toastr.error( err.message , err.error );
  }

  loadDonutChart(): void{
    this.chartOptionsDonut = {
      series: [],
      chart: {
        type: "donut"
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  loadDonutColumn(): void{
    this.chartOptionsColumn = {
      series: [],
      chart: {
        type: "bar",
        height: 380
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      },
      yaxis: {
        title: {
          text: "(instances)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + " instaces";
          }
        }
      }
    };
  }


  loadDonutLineColumnArea(): void {
    this.chartOptionsLineColumnArea = {
      series: [
        // {
        //   name: "TEAM A",
        //   type: "column",
        //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        // },
        // {
        //   name: "TEAM B",
        //   type: "area",
        //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        // },
        // {
        //   name: "TEAM C",
        //   type: "line",
        //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        // },

        // {
        //   name: "TEAM D",
        //   type: "column",
        //   data: [30, 25, 36,  64, 52, 59, 36, 39 , 30, 45, 35]
        // },
      ],
      chart: {
        height: 370,
        type: "line",
        stacked: false
      },
      stroke: {
        width: [ 0, 2, 5 ],
        curve: "smooth"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%"
        }
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: [

        "01/01/2020",
        "02/01/2020",
        "03/01/2020",
        "04/01/2020",
        "05/01/2020",
        "06/01/2020",
        "07/01/2020",
        "08/01/2020",
        "09/01/2020",
        "10/01/2020",
        "11/01/2020"

        // "01/01/2003",
        // "02/01/2003",
        // "03/01/2003",
        // "04/01/2003",
        // "05/01/2003",
        // "06/01/2003",
        // "07/01/2003",
        // "08/01/2003",
        // "09/01/2003",
        // "10/01/2003",
        // "11/01/2003"
      ],
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        title: {
          text: "Points"
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          }
        }
      }
    };
  }

  loadLineColumnArea(): void{
    this.chartOptionsDistributedColumns = {
      series: [
        {
          name: "instances Of Account",
          data: [21, 22, 10, 28, 16, 21, 13, 30]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          ["John", "Doe"],
          ["Joe", "Smith"],
          ["Jake", "Williams" , "Williams"],
          "Amber",
          ["Peter", "Brown"],
          ["Mary", "Evans"],
          ["David", "Wilson"],
          ["Lily", "Roberts"]
        ],
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
              "#D10CE8"
            ],
            fontSize: "12px"
          }
        }
      }
    };
  }

  range = ( end , start = 0 ): number[] => [...Array(end - start + 1)].map((_, i) => start + i);

}
