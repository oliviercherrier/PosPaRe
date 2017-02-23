import {Component, ViewChild, ElementRef} from '@angular/core';
import {AuthService} from '../../services/auth';
import {ListOfActivitiesPage} from '../list-of-activities/list-of-activities';
import {DataService} from '../../services/data-service';
import {MyTypedItem} from '../../models/myTypedItem';
import { NavController, NavParams } from 'ionic-angular';

import { Chart } from 'angular-highcharts';

/*
  Generated class for the StatisticsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-statistics',
  providers: [DataService],
  templateUrl: 'statistics.html'
})

export class StatisticsPage {
  public myItems: MyTypedItem [];
  public auth: AuthService;

  constructor(public _auth: AuthService, private dataService: DataService, public navCtrl: NavController, public navParams: NavParams) {
    this.auth = _auth;

    this.mumyWeightChartOptions = {
      title: {
          text: undefined
      },
      chart: {
          zoomType: 'x'
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      xAxis: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',      
        minorTickLength: 0,
        tickLength: 0,
        gridLineWidth: 0,
      },
      yAxis: {
        max: 78, 
        min: 75,
        title: {
            text: ''
        }
      },
      series: [
        {name: 'Poids', data: [77,78,76,75]}
      ]
    };

    this.babyWeightChartOptions = {
      title: {
          text: undefined
      },
      chart: {
          zoomType: 'x'
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      xAxis: {
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',      
        minorTickLength: 0,
        tickLength: 0,
        gridLineWidth: 0,
      },
      yAxis: {
        max: 10, 
        min: 8,
        title: {
            text: ''
        }
      },
      series: [
        {name: 'Poids', data: [8,9,10,10]}
      ]
    };

    this.mumyProgressBarOptions = {
        chart: {
            type: 'bar'
        },
        title: {
          text: undefined
        },
        credits: {
          enabled: false
        },
        xAxis: {
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',      
          labels: {
            enabled: false
          },
          minorTickLength: 0,
          tickLength: 0,
          gridLineWidth: 0,
        },   
        yAxis: {
          plotLines: [{ // Light air
                value: Date.UTC(1970, 0, 1, 5, 0),
                width: 2,
                color: 'white',
                zIndex: 5,
                label: {
                    rotation: 0,
                    textAlign: 'center',
                    y: 3,
                    verticalAlign: 'bottom',
                    text: "Aujourd'hui",
                    style: {
                        color: '#000000',
                        
                    }
                }
          }],
          type: 'datetime',
          tickInterval: 3600 * 1000, //1 hour
          min: 0,
          dateTimeLabelFormats: {
              millisecond: '%H:%M:%S',
              second: '%H:%M:%S',
              minute: '%H:%M:%S',
              hour: '%H:%M:%S',
              day: '%H:%M:%S',
              week: '%H:%M:%S',
              month: '%H:%M:%S',
              year: '%H:%M:%S'
          },
          labels: {
            enabled: false
          },
          gridLineWidth: 0,
          title: {
            text: ''
          }
        },
        legend: {
          reversed: true,
          enabled: false
        },
        plotOptions: {
          series: {
            stacking: 'normal',
          },
          bar: {
            dataLabels: {
               formatter: function(){
                let date = new Date(this.y);
                return "<span style=\"font-size: 80%\">"+date.getUTCHours().toString() + "h" + date.getUTCMinutes().toString() + "</span>";
              },
              enabled: true,
              color: 'white',
              style: {
                textShadow: '0 0 3px black'
              }
            }
          },
        },
        tooltip: {
            formatter: function () {
                return 'Retard de 32 min';
            }
        },
        series: [
          { data: [Date.UTC(1970, 0, 1, 3,46)]},
          { data: [Date.UTC(1970, 0, 1, 4,14)]
        }]
    };
  }

  ionViewDidEnter(){

/*
 (data) => this.myItems = data,

 équivaut à
 
 function (data){
   this.myItems = data;
 }.bind(this),
 */


    // Get data from REST API
    /*this.dataService
      .GetAll()
      .subscribe(
        (data) => { this.myItems = data } ,
        error => console.log(error),
        () => console.log(this.myItems)
      );*/

    // Get profile User Name
    console.log("User connected as: " + this.auth.user["nickname"]);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');
  }

  saveMumyWeightChart(chartInstance) {
      this.mumyWeightChart = chartInstance;
  }

  saveBabyWeightChart(chartInstance) {
      this.babyWeightchart = chartInstance;
  }

  saveMumyProgressBar(chartInstance) {
      this.mumyProgressBar = chartInstance;
  }
  
  mumyWeightChart : {};
  mumyWeightChartOptions: {};

  babyWeightchart : {};
  babyWeightChartOptions: {};

  mumyProgressBar: {};
  mumyProgressBarOptions: {};
}