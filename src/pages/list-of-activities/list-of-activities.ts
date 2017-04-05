import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthService} from '../../services/auth';
import {NotificationsPage} from '../notifications/notifications';

import * as L from 'leaflet';
/*
  Generated class for the ListOfActivitiesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var omnivore: any;

@Component({
  selector: 'page-list-of-activities',
  templateUrl: 'list-of-activities.html',
})
export class ListOfActivitiesPage {
  public nav: NavController;
  activities: Array<{fileName: string, id: string}>;
  private initialized: boolean = false;

  constructor(private auth: AuthService, private _navCtrl: NavController, navParams: NavParams) {
    this.nav = _navCtrl;

    // Create one div per activity to display
    this.activities = [];
    this.activities.push({fileName: 'assets/tmp/gpx/Mollard.gpx', id:'Mollard'});
    this.activities.push({fileName: 'assets/tmp/gpx/Mollard.gpx', id:'Mollard2'});
  }
  
  ionViewDidEnter (){
    if(this.initialized == false){
      // Populate each activity div with the related activity mapsCreate one div per activity to displa
      for (let activity of this.activities){
        let my_map = L.map('map_' + activity.id);
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(my_map);
        let runLayer = omnivore.gpx(activity.fileName);
        runLayer.on('ready', function() {
            my_map.fitBounds(runLayer.getBounds());
          });
        runLayer.addTo(my_map);
      }
      this.initialized = true;
    }
  }

  activityClicked(activity){
    
  }
  showNotifications() {
    this.nav.push(NotificationsPage);
  }
}
