import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthService} from '../../services/auth';
import {NotificationsPage} from '../notifications/notifications';

import * as L from 'leaflet';

declare var require;

require('leaflet-easybutton');
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

  constructor(private auth: AuthService, private _navCtrl: NavController, navParams: NavParams) {
    this.nav = _navCtrl;

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

        // Add Like button to current map
        let likeButtonCtrl =  L.Control.extend({
          options: {
            position: 'topright'
          },

          onAdd: function (map) {
            var container = L.DomUtil.create();
            container.type="button";
            container.innerHTML = '<div style="padding: 2px; display: flex; align-items: center; justify-content: center;"> <span style="fnt-size:"80%">42</span> <i style = "margin: 4px" class="fa fa-thumbs-up fa-pull-left fa-lg" aria-hidden="true"></i> </div>';
            container.style.backgroundColor = 'white';     
            container.style.width = '50px';
            container.style.height = '30px';
            container.style.border= "1px solid gray"
            container.style.padding = "2px";
            container.style.borderRadius = "4px";

            container.onclick = function(){
              console.log('likeButtonCtrl buttonClicked');
            }

            return container;
          }
        });
        my_map.addControl(new likeButtonCtrl());


        // Add Comment button to current map
        let commentButtonCtrl =  L.Control.extend({
          options: {
            position: 'topright'
          },

          onAdd: function (map) {
            var container = L.DomUtil.create();
            container.type="button";
            container.innerHTML = '<div style="padding: 2px; display: flex; align-items: center; justify-content: center;"> <span style="fnt-size:"80%">3</span> <i style = "margin: 4px" class="fa fa-comment fa-pull-left fa-lg" aria-hidden="true"></i> </div>';
            container.style.backgroundColor = 'white';     
            container.style.width = '50px';
            container.style.height = '30px';
            container.style.border= "1px solid gray"
            container.style.padding = "2px";
            container.style.borderRadius = "4px";

            container.onclick = function(){
              console.log('commentButtonCtrl buttonClicked');
            }

            return container;
          }
        });
        my_map.addControl(new commentButtonCtrl());

      }
  }

  activityClicked(activity){
    
  }
  showNotifications() {
    this.nav.push(NotificationsPage);
  }
}
