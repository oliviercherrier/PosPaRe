import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

/*
  Generated class for the AddFriends page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-friends',
  templateUrl: 'add-friends.html'
})
export class AddFriendsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFriendsPage');
  }

  contactTapped(){

  }
  gmailTapped(){

  }
  twitterTapped(){

  }
  inviteTapped(){
    let alert = this.alertCtrl.create({
      title: 'Develop me',
      subTitle: 'If you think it is relevant for GO LIVE!',
      buttons: ['OK']
    });
    alert.present();
  }
  promoteTapped(){

  }

}
