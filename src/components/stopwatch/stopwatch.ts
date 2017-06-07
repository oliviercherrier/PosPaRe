import { Component, Input, OnInit } from '@angular/core';

/*
  Generated class for the Stopwatch component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'stopwatch',
  templateUrl: 'stopwatch.html'
})
export class StopwatchComponent implements OnInit{
    public timeInSeconds: number = 0;
    public timerRunning: boolean = false;

    public displayTime: string;

    constructor() {

    }
    ngOnInit() {
        this.initTimer();
    }

    initTimer() {
        this.displayTime = this.getSecondsAsDigitalClock(this.timeInSeconds);
    }

    startTimer() {
        this.timerRunning = true;
        this.timerTick();
    }

    pauseTimer() {
        this.timerRunning = false;
    }

    timerTick() {
        setTimeout(() => {
            if (!this.timerRunning) { return; }
            this.displayTime = this.getSecondsAsDigitalClock(++this.timeInSeconds);
            this.timerTick();
        }, 1000);
    }

  getSecondsAsDigitalClock(inputSeconds: number) {
      var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);
      var hoursString = '';
      var minutesString = '';
      var secondsString = '';
      hoursString = (hours < 10) ? "0" + hours : hours.toString();
      minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
      secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
      return hoursString + ':' + minutesString + ':' + secondsString;
  }
}
