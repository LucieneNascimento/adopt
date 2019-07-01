import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { IonicPage, NavController, NavParams, MenuController, ToastController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl : ToastController,
    public firebaseauth : AngularFireAuth,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController) {
  }
  @ViewChild('email') email;
  @ViewChild('senha') senha;
  @ViewChild('senha1') senha1;

  s:string;
  ss: string;

  ionViewDidLoad() {
    this.menuCtrl.enable(false);
    console.log('ionViewDidLoad RegisterPage');
  }

  conferirSenha() {
      if((this.s==this.ss) && ((this.s!=null) && (this.ss!=null))){
        console.log('check');
      }else{
        const toast = this.toastCtrl.create({
          message: 'As senhas não conferem.',
          duration: 3000
        });
        toast.present();
      }
  }

  register(){
    this.firebaseauth.auth.createUserWithEmailAndPassword(this.email.value,this.senha.value)
    .then(()=> {
      this.msgSucesso();
    })
    .catch(()=> {
      this.msgErro();
    })
   }
          
  msgSucesso() {
    const toast = this.toastCtrl.create({
      message: 'Termine seu cadastro em Perfil',
      duration: 3000
    });
    toast.present();
  }

  msgErro() {
    const toast = this.toastCtrl.create({
      message: 'Cadastro Inválido',
      duration: 3000
    });
    toast.present();
  } 

}
