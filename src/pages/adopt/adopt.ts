import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdoptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adopt',
  templateUrl: 'adopt.html',
})
export class AdoptPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdoptPage');
  }

  adoptDog(){
    this.navCtrl.push('AdoptDogPage');

  }
  adoptCat() {
    this.navCtrl.push('AdoptCatPage');
  }

}
