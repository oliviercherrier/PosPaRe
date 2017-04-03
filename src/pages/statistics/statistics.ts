import {Component} from '@angular/core';
import {AuthService} from '../../services/auth';
import {NotificationsPage} from '../notifications/notifications';
import { NavController, NavParams } from 'ionic-angular';


/*
  Generated class for the StatisticsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-statistics',
  providers: [],
  templateUrl: 'statistics.html'
})

export class StatisticsPage {



  public auth: AuthService;
  public nav: NavController;
  public account: string;


  constructor(public _auth: AuthService, public _navCtrl: NavController, public navParams: NavParams) {
    this.auth = _auth;
    this.nav = _navCtrl;
    this.account = "Lucie";

 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');

  }

  showNotifications() {
    this.nav.push(NotificationsPage);
  }


}