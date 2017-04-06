import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import {AuthService} from '../services/auth';
import { MyApp } from './app.component';
import { FriendsPage } from '../pages/friends/friends';
import { HomePage } from '../pages/home/home';
import {ListOfActivitiesPage} from '../pages/list-of-activities/list-of-activities';
import {UserSettingsPage} from '../pages/user-settings/user-settings';
import {RecordActivityPage} from '../pages/record-activity/record-activity';
import {StatisticsPage} from '../pages/statistics/statistics';
import { ChartModule } from 'angular2-highcharts';
import {NotificationsPage} from '../pages/notifications/notifications';
import {AddFriendsPage} from'../pages/add-friends/add-friends';
import {RequestFriendshipPage} from'../pages/request-friendship/request-friendship';
import {WeightChartsComponent} from '../components/weight-charts/weight-charts'
import {ProgressBarComponent} from '../components/progress-bar/progress-bar'
import {LastWeeksSummaryComponent} from '../components/last-weeks-summary/last-weeks-summary'
import {ProfilePage} from'../pages/profile/profile';
import  {LargeChartsPage} from '../pages/large-charts/large-charts'

let storage: Storage = new Storage();

declare var require;

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    FriendsPage,
    HomePage,
    ListOfActivitiesPage,
    UserSettingsPage,
    RecordActivityPage,
    StatisticsPage,
    NotificationsPage,
    AddFriendsPage,
    RequestFriendshipPage,
    WeightChartsComponent,
    ProgressBarComponent,
    LastWeeksSummaryComponent,
    ProfilePage,
    LargeChartsPage
  ],
  // Module used into HTML code
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule, 
    ChartModule.forRoot(require('highcharts'))
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FriendsPage,
    HomePage,
    ListOfActivitiesPage,
    UserSettingsPage,
    RecordActivityPage,
    StatisticsPage,
    NotificationsPage,
    AddFriendsPage,
    RequestFriendshipPage,
    ProfilePage,
    LargeChartsPage
  ],
  providers: [
    AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
