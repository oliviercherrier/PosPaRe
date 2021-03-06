import { Component, Input } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ChartModule } from 'angular2-highcharts';

import {LargeChartsPage} from '../../pages/large-charts/large-charts'

import {VIEW_MODE, HIGHCHARTS_OPTIONS} from '../../pages/large-charts/view-mode';

declare var require;
const Highcharts = require('highcharts');

/*
  Generated class for the StatisticsChart component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'weight-charts',
  templateUrl: 'weight-charts.html',
})
export class WeightChartsComponent {
  @Input('account') account: string;

  mumyWeightChart : any;
  mumyWeightChartOptions: {};

  babyWeightchart : any;
  babyWeightChartOptions: {};

  constructor( public navCtrl: NavController) {

    Highcharts.setOptions(HIGHCHARTS_OPTIONS);

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
        type: 'datetime',
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
        {name: 'Poids', data: [            
          [Date.UTC(2017, 3, 15), 78],
          [Date.UTC(2017, 3, 16), 77],
          [Date.UTC(2017, 3, 17), 76],
          [Date.UTC(2017, 3, 18), 75]]
        }
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
        type: 'datetime',
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
        {name: 'Poids', data: [            
          [Date.UTC(2017, 3, 15), 8],
          [Date.UTC(2017, 3, 16), 9],
          [Date.UTC(2017, 3, 17), 10],
          [Date.UTC(2017, 3, 18), 10]]}
      ]
    };
  }

  saveMumyWeightChart(chartInstance) {
      this.mumyWeightChart = chartInstance;
  }

  saveBabyWeightChart(chartInstance) {
      this.babyWeightchart = chartInstance;
      this.babyWeightchart.redraw();
  }

  displayDetailledStats(){
    this.navCtrl.push(LargeChartsPage);
  }
}
