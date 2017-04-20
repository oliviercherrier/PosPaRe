import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';

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

  curMumyWeight: number = 75.0;
  curBabyWeight: number = 10.0;

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
        title: {
            text: ''
        }
      },
      series: [
        {
          name: 'Poids', 
          data: [82,81,79,80,79,78,77,78,76,75],
          allowPointSelect: true
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
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',      
        minorTickLength: 0,
        tickLength: 0,
        gridLineWidth: 0,
      },
      yAxis: {
        title: {
            text: ''
        }
      },
      series: [
        {name: 'Poids', data: [4,5,6,7,7,8,9,10,10], allowPointSelect: true}
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

    // Add point to mumy Chat
    this.repeatLastPointInChart(this.mumyWeightChart);

    // Add point to baby Chat
    this.repeatLastPointInChart(this.babyWeightchart);



  }

  updateLastWeight(chart: String, evol: String){
    let curChart: any;
    let increment: number;
    switch(evol){
      case "+1":
        increment = 1;
        break;
      case "-1":
        
        increment = -1;
        console.log("increment -1" + increment)
        break;
      default:
        console.log("No Increment found for " + chart);
    }

    switch(chart){
      case "mumy":
        this.curMumyWeight  += increment;    
        this.updateLastPointValueInChart(this.mumyWeightChart, this.curMumyWeight);
        break;
      case "baby":
        this.curBabyWeight  += increment;    
        this.updateLastPointValueInChart(this.babyWeightchart, this.curBabyWeight);
        break;
      default:
        console.log("No chart found for " + chart);
    }



  }

  getLastPointInChart(chart: any){
    return chart.series[0].data[chart.series[0].data.length -1];
  }

  updateLastPointValueInChart(chart: any, value: Number){
    let lastPoint = this.getLastPointInChart(chart);
    lastPoint.y = value;
    lastPoint.update(lastPoint);
  }

  repeatLastPointInChart(chart: any){
    // Add new point, same as last point
    let lastPoint = this.getLastPointInChart(chart);
    chart.series[0].addPoint([lastPoint.x + 1,lastPoint.y]);
    
    // Update last point image
    let newPoint = this.getLastPointInChart(chart);
    newPoint["marker"] = { symbol: 'url(assets/img/point-interrogation.png)'};
    newPoint.update(newPoint);
  }
  
  ngAfterViewChecked(){
    this.mumyWeightChart.reflow();
    this.babyWeightchart.reflow();
  }

  onPointSelect(event){
    console.log("Point selected");
  }
}
