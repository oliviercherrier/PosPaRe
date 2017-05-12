import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {HerListOfActivitiesPage} from '../her-list-of-activities/her-list-of-activities'

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  curFriend: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.curFriend = navParams.get('friend');
  }

  displayRecentActivities(){
    this.navCtrl.push(HerListOfActivitiesPage,{users: this.curFriend});
  }
}
