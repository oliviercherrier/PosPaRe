import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

/*
  Generated class for the LikeAndComments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-like-and-comments',
  templateUrl: 'like-and-comments.html'
})
export class LikeAndCommentsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LikeAndCommentsPage');
  }

  addCommentTapped(){
    let prompt = this.alertCtrl.create({
      inputs: [
        {
          name: 'title',
          placeholder: 'Ajouter un commentaire'
        },
      ],
      buttons: [
        {
          text: 'Ajouter',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}
