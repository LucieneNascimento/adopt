import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';

/**
 * Generated class for the DonateDPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donate-d',
  templateUrl: 'donate-d.html',
})
export class DonateDPage {
  formGroup: FormGroup;
  firestore = firebase.firestore();

  loader = this.loadingCtrl.create({content: "Aguarde...",duration: 3000});
  toast(text : string){
    let toast = this.toastCtrl.create({message: 'Seu pet foi cadastrado no sistema de adoção',duration: 3000,position: 'bottom'});
    toast.present();
  }


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder : FormBuilder,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
    this.form();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonateDPage');
  }
  form(){
    this.formGroup = this.formBuilder.group({
      tipo: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      idade: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      raca: ['', [Validators.required]],
      tamanho: ['', [Validators.required]]
      
    });
  }
  donate(){
    this.loader.present(); // <----- Exibe o loading
    this.firestore.collection("doacaoCao").add(this.formGroup.value) // tenta cadastrar
      .then(ref => { // Cadastro sucesso
        this.loader.dismiss(); // <----- Retira o loading
        this.toast('Cadastrado com sucesso');// <----- Exibe mensagem
        this.navCtrl.push('AdoptPage');
    }).catch(err => { // Cadastro com erro
      this.loader.dismiss();// <----- Retira o loading
      this.toast(err.message); // <----- Exibe mensagem
    });
  }
}
