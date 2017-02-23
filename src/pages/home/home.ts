import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {StatisticsPage} from '../statistics/statistics';
import {ListOfActivitiesPage} from '../list-of-activities/list-of-activities';
import {FriendsPage} from '../friends/friends';
import {AuthService} from '../../services/auth';
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private tabStatistics;
  private tabActivites;
  private tabFriends;

  constructor(private auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
    this.tabActivites = ListOfActivitiesPage;
    this.tabStatistics = StatisticsPage;
    this.tabFriends = FriendsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
