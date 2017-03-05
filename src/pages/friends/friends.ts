import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthService} from '../../services/auth';


@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {
  friends: Array<{name: string}>;
  constructor(private auth: AuthService, private navCtrl: NavController) {
    this.friends = [];
    this.friends.push({name: 'Anne Perdrillat'});
    this.friends.push({name: "Julie Morel"});
  }

  friendTapped(event, item) {
    /*this.navCtrl.push(ItemDetailsPage, {
      item: item
    });*/
  }

}
