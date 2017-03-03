import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthService} from '../../services/auth';

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

  activities: Array<{fileName: string, id: string}>;

  constructor(private auth: AuthService, private navCtrl: NavController, navParams: NavParams) {
    // Create one div per activity to display
    this.activities = [];
    this.activities.push({fileName: 'assets/tmp/gpx/Mollard.gpx', id:'Mollard'});
    this.activities.push({fileName: 'assets/tmp/gpx/Mollard.gpx', id:'Mollard2'});
  }
  
  ionViewDidEnter (){
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
  }

}
