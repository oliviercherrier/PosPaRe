import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AuthService} from '../../services/auth';

import {NotificationsPage} from '../notifications/notifications';
import {AddFriendsPage} from'../add-friends/add-friends';
import {RequestFriendshipPage} from'../request-friendship/request-friendship';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {

  friends: Array<{name: string}>;

  constructor(public auth: AuthService, public navCtrl: NavController,  public alertCtrl: AlertController) {

    this.friends = [];
    this.friends.push({name: 'Anne Perdrillat'});
    this.friends.push({name: "Julie Morel"});
  }

  friendTapped(event, item) {
    /*this.navCtrl.push(ItemDetailsPage, {
      item: item
    });*/
  }

  notificationsTapped() {
    this.navCtrl.push(NotificationsPage);
  }

  addFriendsTapped(){
    this.navCtrl.push(AddFriendsPage);
  }

  inviteTapped(){
    let alert = this.alertCtrl.create({
      title: 'Develop me',
      subTitle: 'If you think it is relevant for GO LIVE!',
      buttons: ['OK']
    });
    alert.present();
  }

  askForFriendsRequestTapped(){
    this.navCtrl.push(RequestFriendshipPage);
  }

}
