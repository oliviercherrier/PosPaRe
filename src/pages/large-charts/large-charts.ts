import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

/*
  Generated class for the LargeCharts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-large-charts',
  templateUrl: 'large-charts.html',
  providers: [ScreenOrientation]
})
export class LargeChartsPage {

  mumyWeightChart : {};
  mumyWeightChartOptions: {};

  babyWeightchart : {};
  babyWeightChartOptions: {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation, public platform: Platform) {
    platform.ready().then(() => {
      //this.screenOrientation.lock('landscape');
    });

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
        max: 82, 
        min: 75,
        title: {
            text: ''
        }
      },
      series: [
        {name: 'Poids', data: [82,81,79,80,79,78,77,78,76,75]}
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
        min: 4,
        title: {
            text: ''
        }
      },
      series: [
        {name: 'Poids', data: [4,5,6,7,7,8,9,10,10]}
      ]
    };
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LargeChartsPage');
  }

  ionViewWillLeave(){
    // this.screenOrientation.unlock();
  }

  saveMumyWeightChart(chartInstance) {
      this.mumyWeightChart = chartInstance;
  }

  saveBabyWeightChart(chartInstance) {
      this.babyWeightchart = chartInstance;
  }

}
