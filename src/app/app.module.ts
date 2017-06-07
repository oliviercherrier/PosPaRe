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
import {MyListOfActivitiesPage} from '../pages/my-list-of-activities/my-list-of-activities';
import {HerListOfActivitiesPage} from '../pages/her-list-of-activities/her-list-of-activities';
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
import {LikeAndCommentsPage} from '../pages/like-and-comments/like-and-comments';
import {ListOfActivitiesComponent} from '../components/list-of-activities/list-of-activities';
import {StopwatchComponent} from '../components/stopwatch/stopwatch';

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
    MyListOfActivitiesPage,
    HerListOfActivitiesPage,
    UserSettingsPage,
    RecordActivityPage,
    StatisticsPage,
    NotificationsPage,
    AddFriendsPage,
    RequestFriendshipPage,
    WeightChartsComponent,
    ProgressBarComponent,
    LastWeeksSummaryComponent,
    ListOfActivitiesComponent,
    StopwatchComponent,
    ProfilePage,
    LargeChartsPage,
    LikeAndCommentsPage
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
    MyListOfActivitiesPage,
    HerListOfActivitiesPage,
    UserSettingsPage,
    RecordActivityPage,
    StatisticsPage,
    NotificationsPage,
    AddFriendsPage,
    RequestFriendshipPage,
    ProfilePage,
    LargeChartsPage,
    LikeAndCommentsPage
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
