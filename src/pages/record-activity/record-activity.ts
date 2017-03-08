import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import * as L from 'leaflet';

@Component({
  selector: 'page-record-activity',
  templateUrl: 'record-activity.html'
})
export class RecordActivityPage {
  /**
  * Reference to BackgroundGeolocation
  */
  private bgGeo: any;
  private map: any;
  public locations; // Polyline for leaflet
  private currentLocationLMarker: any; // Leaflet CircleMarker
  private currentLocationErrorLCircle: any; // Leaflet CircleMarker
  private registeringEnable: boolean = false;

  public nav: NavController;
  public platform: Platform;
  constructor(public _navCtrl: NavController, public _platform: Platform) {
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
    this.locations = L.polyline([], {color: 'blue'}).addTo(this.map);
    this.currentLocationLMarker =  L.circleMarker([1,1],{color: "#ff0000"}).addTo(this.map);
    this.currentLocationErrorLCircle = L.circle([1,1],{weight: 0, fillColor: "#ff0000", fillOpacity: 0.5}).addTo(this.map);

    this.platform.ready().then(this.configureBackgroundGeolocation.bind(this));
  }

  startRegistering(){
    this.registeringEnable = true;
  }

  onLocation(location, taskId) {
    console.log('- location: ', location);

    // Update leaflet map
    if (this.registeringEnable) {    
      this.locations.addLatLng([location.coords.latitude, location.coords.longitude]);
    }
    this.map.setView([location.coords.latitude, location.coords.longitude],16);
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
}