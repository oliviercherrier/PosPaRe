import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthService} from '../../services/auth';
import {NotificationsPage} from '../notifications/notifications';

/*
  Generated class for the MyListOfActivitiesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


@Component({
  selector: 'page-my-list-of-activities',
  templateUrl: 'my-list-of-activities.html',
})
export class MyListOfActivitiesPage {
  context: string = "my";

  constructor(private auth: AuthService, public navCtrl: NavController, navParams: NavParams) {
  }

  showNotifications() {
    this.navCtrl.push(NotificationsPage);
  }
}
