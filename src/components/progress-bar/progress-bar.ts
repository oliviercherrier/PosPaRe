import { Component } from '@angular/core';

/*
  Generated class for the ProgressBar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {


  mumyProgressBar: {};
  mumyProgressBarOptions: {};

  constructor() {
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
  
  saveMumyProgressBar(chartInstance) {
      this.mumyProgressBar = chartInstance;
  }
}
