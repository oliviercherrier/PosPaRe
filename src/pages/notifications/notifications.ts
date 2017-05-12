import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {RequestFriendshipPage} from '../request-friendship/request-friendship';
import {ProfilePage} from '../profile/profile';

/*
  Generated class for the Notifications page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  displayRequestFriendship(){
      this.navCtrl.push(RequestFriendshipPage);
  }

  displayProfile(){
    this.navCtrl.push(ProfilePage, {
      friend: {name:  "Olivier Cherrier"}
    });
  }
}
