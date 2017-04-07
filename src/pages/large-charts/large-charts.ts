import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';

import {LastWeeksSummaryComponent} from '../../components/last-weeks-summary/last-weeks-summary'

import {VIEW_MODE} from './view-mode';
/** Commented because we force globbaly orientation of screen to partrait into config.xml */
/* import { ScreenOrientation } from '@ionic-native/screen-orientation'; */

/*
  Generated class for the LargeCharts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/




@Component({
  selector: 'page-large-charts',
  templateUrl: 'large-charts.html',
  /** Commented because we force globbaly orientation of screen to partrait into config.xml */
  /* providers: [ScreenOrientation]*/
})
export class LargeChartsPage {

  VIEW_MODE: typeof VIEW_MODE = VIEW_MODE;

  mumyWeightChart : any;
  mumyWeightChartOptions: {};

  babyWeightchart : any;
  babyWeightChartOptions: {};


  private inEditMode: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams/*, private screenOrientation: ScreenOrientation*/, public platform: Platform, private alertCtrl: AlertController) {

    /** Commented because we force globbaly orientation of screen to partrait into config.xml */
    /*platform.ready().then(() => {
      this.screenOrientation.lock('landscape');
    });*/

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
  
  ionViewDidEnter() {
  }

  /** Commented because we force globbaly orientation of screen to partrait into config.xml */
  /*ionViewWillLeave(){
    this.screenOrientation.unlock();
  }*/

  saveMumyWeightChart(chartInstance) {
      this.mumyWeightChart = chartInstance;
  }

  saveBabyWeightChart(chartInstance) {
      this.babyWeightchart = chartInstance;
  }

  addWeightEvolution(){
    this.inEditMode = ! this.inEditMode;
    setTimeout( () => { this.mumyWeightChart.reflow(); this.babyWeightchart.reflow();}, 1000);
    
    
    console.log(this.inEditMode);
  }
}
