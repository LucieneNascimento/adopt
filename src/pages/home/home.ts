import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menuCtrl.enable(true);
  }
  adopt(){
    this.navCtrl.setRoot('AdoptPage');
  }
  donate(){
    this.navCtrl.push('DonatePage');
  }
}