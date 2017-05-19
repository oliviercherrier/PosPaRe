import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ProfilePage} from '../profile/profile';

/*
  Generated class for the RequestFriendship page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-request-friendship',
  templateUrl: 'request-friendship.html'
})
export class RequestFriendshipPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestFriendshipPage');
  }

  displayProfile(){
    this.navCtrl.push(ProfilePage, {
      friend: {name:  "Lucile Boisgontier"}
    });
  }
}
