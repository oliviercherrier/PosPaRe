import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthService} from '../../services/auth';

import {NotificationsPage} from '../notifications/notifications';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {

  friends: Array<{name: string}>;
  public nav: NavController;
  constructor(private auth: AuthService, private _navCtrl: NavController) {
    this.nav = _navCtrl;

    this.friends = [];
    this.friends.push({name: 'Anne Perdrillat'});
    this.friends.push({name: "Julie Morel"});
  }

  friendTapped(event, item) {
    /*this.navCtrl.push(ItemDetailsPage, {
      item: item
    });*/
  }

  showNotifications() {
    this.nav.push(NotificationsPage);
  }
}
