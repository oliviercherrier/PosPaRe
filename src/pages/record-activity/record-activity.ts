import { Component } from '@angular/core';
import { NavController, Platform, FabContainer, AlertController} from 'ionic-angular';
import {WORKOUT_STATUS} from './workout-status';

import * as L from 'leaflet';

declare var require;

require('leaflet-easybutton');

@Component({
  selector: 'page-record-activity',
  templateUrl: 'record-activity.html'
})
export class RecordActivityPage {
  WORKOUT_STATUS: typeof WORKOUT_STATUS = WORKOUT_STATUS;
  /**
  * Reference to BackgroundGeolocation
  */
  private bgGeo: any;
  private map: any;
  public locations; // Polyline for leaflet
  private currentLocationLMarker: any; // Leaflet CircleMarker
  private currentLocationErrorLCircle: any; // Leaflet CircleMarker
  private lastRecenteringTimestamp = 0; // Timestamp when the last recentering of location have been made on Leaflet

  private workoutStatus: WORKOUT_STATUS = WORKOUT_STATUS.NotStarted;

  public nav: NavController;
  public platform: Platform;
  constructor(public _navCtrl: NavController, public _platform: Platform, public alertCtrl: AlertController) {
    this.nav = _navCtrl;
    this.platform = _platform;  
  }

  configureBackgroundGeolocation() {
    // 1. Get a reference to the plugin
    this.bgGeo = (<any>window).BackgroundGeolocation;

    // 2. Listen to events
    this.bgGeo.on('location', this.onLocation.bind(this));
    this.bgGeo.on('motionchange', this.onMotionChange.bind(this));
    this.bgGeo.on('activitychange', this.onActivityChange.bind(this));
    this.bgGeo.on('geofence', this.onGeofence.bind(this));
    this.bgGeo.on('http', this.onHttpSuccess.bind(this), this.onHttpFailure.bind(this));

    // 3. Configure it.
    this.bgGeo.configure({
      debug: true,
      desiredAccuracy: 0,
      distanceFilter: 0,
      locationUpdateInterval: 0,
      fastestLocationUpdateInterval: 0

      // url: 'http://192.168.11.100:8080/locations',
      // autoSync: true
    }, (state) => {
      // 4. Start the plugin.
      this.bgGeo.start();
    });
  }

  ionViewDidEnter (){
    this.map = L.map('mapid');
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.map);

    L.easyButton('fa-map-marker', (btn, map) => {
      map.setView(this.currentLocationLMarker.getLatLng(),16);   
    }).addTo( this.map );


    this.locations = L.polyline([], {color: 'blue'}).addTo(this.map);
    this.currentLocationLMarker =  L.circleMarker([1,1],{color: "#0000ff"}).addTo(this.map);
    this.currentLocationErrorLCircle = L.circle([1,1],{weight: 0, fillColor: "#0000ff", fillOpacity: 0.5}).addTo(this.map);

    this.platform.ready().then(this.configureBackgroundGeolocation.bind(this));
  }

  startWorkout(){
    this.workoutStatus = WORKOUT_STATUS.InProgress;

  }

  pauseWorkout(){
    this.workoutStatus = WORKOUT_STATUS.Paused;
  }

  resumeWorkout(){
    this.workoutStatus = WORKOUT_STATUS.InProgress;
  }

  stopWorkout(){
    this.getWorkoutPrompt().present();
  }

  onLocation(location, taskId) {
    console.log('- location: ', location);

    // Update leaflet map
    if (this.workoutStatus == WORKOUT_STATUS.InProgress) {    
      this.locations.addLatLng([location.coords.latitude, location.coords.longitude]);
    }

    if (this.lastRecenteringTimestamp == 0){
      this.map.setView([location.coords.latitude, location.coords.longitude],16);
      this.lastRecenteringTimestamp = Date.now();
    }

    this.currentLocationLMarker.setLatLng([location.coords.latitude, location.coords.longitude]);
    this.currentLocationErrorLCircle.setLatLng([location.coords.latitude, location.coords.longitude]);
    this.currentLocationErrorLCircle.setRadius(location.coords.accuracy);
    
    this.bgGeo.finish(taskId);
  }
  onMotionChange(isMoving, location, taskId) {
    console.log('- motionchange: ', isMoving, location);

    this.bgGeo.finish(taskId);
  }
  onActivityChange(activity) {
    console.log('- activitychange: ', activity);
  }
  onGeofence(params, taskId) {
    console.log('- geofence: ', params);
    this.bgGeo.finish(taskId);
  }
  onHttpSuccess(response) {
    console.log('- http success: ', response);
  }
  onHttpFailure(response) {
    console.log('- http failure: ', response);
  }

  selectWorkoutType(network: string, fab: FabContainer) {
    fab.close();
  }

  getWorkoutPrompt() {
    return this.alertCtrl.create({
      title: 'Congratulation',
      message: "Enter a name for this new workout",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.nav.pop();
          }
        }
      ]
    });

  }
}