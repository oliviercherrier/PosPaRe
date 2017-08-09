import { Component, ViewChild  } from '@angular/core';
import { NavController, Platform, FabContainer, AlertController} from 'ionic-angular';
import {WORKOUT_STATUS, WORKOUT_TYPE, WORKOUT_CATEGORY} from './workout-status';
import {StopwatchComponent} from '../../components/stopwatch/stopwatch';

import * as L from 'leaflet';

declare var require;

require('leaflet-easybutton');

@Component({
  selector: 'page-record-activity',
  templateUrl: 'record-activity.html'
})
export class RecordActivityPage {
  @ViewChild(StopwatchComponent)
  private stopwatch: StopwatchComponent;

  WORKOUT_STATUS: typeof WORKOUT_STATUS = WORKOUT_STATUS;
  WORKOUT_TYPE: typeof WORKOUT_TYPE = WORKOUT_TYPE;
  WORKOUT_CATEGORY: typeof WORKOUT_CATEGORY = WORKOUT_CATEGORY;
  /** 
  * Reference to BackgroundGeolocation
  */
  private bgGeo: any;
  private map: any;
  public locations; // Polyline for leaflet
  private currentLocationLMarker: any; // Leaflet CircleMarker
  private currentLocationErrorLCircle: any; // Leaflet CircleMarker
  private lastRecenteringTimestamp = 0; // Timestamp when the last recentering of location have been made on Leaflet

  public workoutStatus: WORKOUT_STATUS = WORKOUT_STATUS.NotStarted;
  public workoutType: WORKOUT_TYPE = WORKOUT_TYPE.bicycle;
  public workoutCategory: WORKOUT_CATEGORY = WORKOUT_CATEGORY.path;

  constructor(public navCtrl: NavController, public platform: Platform, public alertCtrl: AlertController) {
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
      fastestLocationUpdateInterval: 0,
      url: 'http://192.168.36.243:3000/api/v1/workouts/2/locations',
      autoSync: false
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
    // Start to sent location to server
    this.bgGeo.setConfig({
      autoSync: true
    }, (state) => {
      console.log("autoSync set to true")
    });

    this.workoutStatus = WORKOUT_STATUS.InProgress;
    this.stopwatch.startTimer();
  }

  pauseWorkout(){
    this.bgGeo.setConfig({
      autoSync: false
    }, (state) => {
      console.log("autoSync set to false")
    });

    this.workoutStatus = WORKOUT_STATUS.Paused;
    this.stopwatch.pauseTimer();
  }

  resumeWorkout(){
    this.bgGeo.setConfig({
      autoSync: true
    }, (state) => {
      console.log("autoSync set to true")
    });
    this.workoutStatus = WORKOUT_STATUS.InProgress;
    this.stopwatch.startTimer();
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

  selectWorkoutType(workoutType: WORKOUT_TYPE, fab: FabContainer) {

    this.workoutType = workoutType;
    switch(workoutType) {
      case WORKOUT_TYPE.bicycle:
        this.workoutCategory = WORKOUT_CATEGORY.path;
        break;
      case WORKOUT_TYPE.walk:
        this.workoutCategory = WORKOUT_CATEGORY.path;
        break;
      case WORKOUT_TYPE.fitness:
        this.workoutCategory = WORKOUT_CATEGORY.static;
        break;
      default:
        console.error("Unfound workout type: " + workoutType);
    }

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
            this.navCtrl.pop();
          }
        }
      ]
    });

  }
}