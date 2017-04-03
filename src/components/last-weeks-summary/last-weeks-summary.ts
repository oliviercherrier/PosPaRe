import { Component } from '@angular/core';

/*
  Generated class for the LastWeeksSummary component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'last-weeks-summary',
  templateUrl: 'last-weeks-summary.html'
})
export class LastWeeksSummaryComponent {

  text: string;

  constructor() {
    console.log('Hello LastWeeksSummary Component');
    this.text = 'Hello World';
  }

}
