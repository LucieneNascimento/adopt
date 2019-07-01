import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../model/usuario';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-registerr',
  templateUrl: 'registerr.html',
})
export class RegisterrPage {

  firestore = firebase.firestore();
  uid : string;
  usuario : Usuario = new Usuario();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebaseauth : AngularFireAuth) {

    this.uid = this.firebaseauth.auth.currentUser.uid

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterrPage');
    var docRef = this.firestore.collection("usuario").doc(this.uid);
    
    docRef.get().then(doc=> {

      if (doc.exists) {
        this.usuario.setDados(doc.data());
      }else{
        this.firestore.collection("usuario").doc(this.uid).set(
          {'nome' : '', 'telefone':''}

        ).then(ref => {
          this.usuario.setDados({'nome' : '', 'telefone':''});
        });
      }
    })
  }

}
