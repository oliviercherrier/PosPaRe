import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-record-activity',
  templateUrl: 'record-activity.html'
})
export class RecordActivityPage {
  /**
  * Reference to BackgroundGeolocation
  */
  private bgGeo: any;
  public nav: NavController;
  constructor(public navCtrl: NavController, public platform: Platform) {
    this.nav = navCtrl;

    platform.ready().then(this.configureBackgroundGeolocation.bind(this));
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
      distanceFilter: 10,
      url: 'http://192.168.11.100:8080/locations',
      autoSync: true
    }, (state) => {
      // 4. Start the plugin.
      this.bgGeo.start();
    });
  }

  onLocation(location, taskId) {
    console.log('- location: ', location);
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

  goBack(){
    this.nav.pop();
  }
}