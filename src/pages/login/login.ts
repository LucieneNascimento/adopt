import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('usuario') email;
  @ViewChild('senha') senha;

  constructor(public navCtrl: NavController, public firebaseauth : AngularFireAuth, public navParams: NavParams, public toastCtrl: ToastController, public menuCtrl: MenuController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menuCtrl.enable(false);
  }
  
  login(){
    this.firebaseauth.auth.signInWithEmailAndPassword(this.email.value,this.senha.value)
      .then(()=>{
        this.msgSucesso();
        this.navCtrl.push(HomePage);
      })
      .catch(()=>{
        this.msgErro();
      })
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }

  msgSucesso() {
    const toast = this.toastCtrl.create({
      message: 'Logado com sucesso',
      duration: 3000
    });
    toast.present();
  }

  msgErro() {
    const toast = this.toastCtrl.create({
      message: 'Login Inválido',
      duration: 3000
    });
    toast.present();
  }
}
