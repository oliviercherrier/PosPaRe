import {Component} from '@angular/core';
import {AuthService} from '../../services/auth';
import {NotificationsPage} from '../notifications/notifications';
import { NavController, NavParams } from 'ionic-angular';
import {DataService} from '../../services/data';
import {MyTypedItem} from '../../models/myTypedItem';

/*
  Generated class for the StatisticsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
  providers: [DataService],
})

export class StatisticsPage {
  public myItems: MyTypedItem [];


  public auth: AuthService;
  public nav: NavController;
  public account: string;


  constructor(public _auth: AuthService, public _navCtrl: NavController, public navParams: NavParams, public dataService: DataService) {
    this.auth = _auth;
    this.nav = _navCtrl;
    this.account = "Lucie";

 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatisticsPage');

    // Get data from REST API
    this.dataService
      .GetAll()
      .subscribe(
        (data) => {console.log("dataService succeed"); this.myItems = data } ,
        error => console.log(error),
        () => {
          console.log(this.myItems);
        }
      );
  }

  showNotifications() {
    this.nav.push(NotificationsPage);
  }


}