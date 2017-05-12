import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the HerListOfActivities page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-her-list-of-activities',
  templateUrl: 'her-list-of-activities.html'
})
export class HerListOfActivitiesPage {
  context: string = "her";
  users: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.users = this.navParams.get('users');
  }

  ionViewDidLoad() {
      console.log("users.name in her-list-of-activities" + this.users.name)

  }

}
