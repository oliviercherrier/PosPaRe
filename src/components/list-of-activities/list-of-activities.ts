import { Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LikeAndCommentsPage} from '../../pages/like-and-comments/like-and-comments';
import * as L from 'leaflet';

declare var require;

require('leaflet-easybutton');

/*
  Generated class for the ListOfActivities component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/

declare var omnivore: any;

@Component({
  selector: 'list-of-activities',
  templateUrl: 'list-of-activities.html'
})
export class ListOfActivitiesComponent {
  @Input('users') users: string;
  @Input('context') context: string;


  activities: Array<{fileName: string, id: string}>;
  initialized: boolean = false;

  constructor(public navCtrl: NavController) {

    // Create one div per activity to display
    this.activities = [];
    this.activities.push({fileName: 'assets/tmp/gpx/Mollard.gpx', id:'Mollard'});
    this.activities.push({fileName: 'assets/tmp/gpx/Mollard.gpx', id:'Mollard2'});

    
  }

  ngAfterViewChecked(){
    if (this.initialized){
      return;
    }

    // Populate each activity div with the related activity mapsCreate one div per activity to displa
    for (let activity of this.activities){
      let my_map = L.map('map_' + this.context + "_" +  activity.id);
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

        onAdd: (map) => {
          var container = L.DomUtil.create();
          container.type="button";
          container.innerHTML = '<div style="padding: 2px; display: flex; align-items: center; justify-content: center;"> <span style="fnt-size:"80%">42</span> <i style = "margin: 4px" class="fa fa-thumbs-up fa-pull-left fa-lg" aria-hidden="true"></i> </div>';
          container.style.backgroundColor = 'white';     
          container.style.width = '50px';
          container.style.height = '30px';
          container.style.border= "1px solid gray"
          container.style.padding = "2px";
          container.style.borderRadius = "4px";
          container.onclick = () => {
            this.navCtrl.push(LikeAndCommentsPage);
          }

          return container;
        }
      });
      my_map.addControl(new likeButtonCtrl());


      // Add Comment button to current map
      let commentButtonCtrl =  L.Control.extend(
        {
          options: {
            position: 'topright'
          },

          onAdd: (map) => {
            var container = L.DomUtil.create();
            container.type="button";
            container.innerHTML = '<div style="padding: 2px; display: flex; align-items: center; justify-content: center;"> <span style="fnt-size:"80%">3</span> <i style = "margin: 4px" class="fa fa-comment fa-pull-left fa-lg" aria-hidden="true"></i> </div>';
            container.style.backgroundColor = 'white';     
            container.style.width = '50px';
            container.style.height = '30px';
            container.style.border= "1px solid gray"
            container.style.padding = "2px";
            container.style.borderRadius = "4px";
            container.onclick = () => {
              this.navCtrl.push(LikeAndCommentsPage);
            }

            return container;
          }
        }
      );

      my_map.addControl(new commentButtonCtrl());

    }
    this.initialized = true;
  }
  openComments(){
    console.log("comments openned");
  }

  
  activityClicked(activity){
    
  }
}
