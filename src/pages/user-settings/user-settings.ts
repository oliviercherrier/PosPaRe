import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-settings',
  templateUrl: 'user-settings.html'
})
export class UserSettingsPage {
  
  private userSettings = {
    firstname: "Lucile",
    lastname: "Boisgontier",
    target_weight: 62,
    target_sport_volume_per_week: 3

  };
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSettingsPage');
  }

  logForm() {
    console.log(this.userSettings)
  }
}
