import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { Adopt } from '../../model/adopt';

@IonicPage()
@Component({
  selector: 'page-adopt-cat',
  templateUrl: 'adopt-cat.html',
})
export class AdoptCatPage {
  firestore = firebase.firestore();
  adopts : Adopt [] = [];
  uid : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.listaAdopt();
    console.log('ionViewDidLoad AdoptCatPage');
  }

  listaAdopt(){
    var ref = firebase.firestore().collection("doacaoAnimal").where("tipo","==","Gato");
    ref.get().then(query =>{
      
      query.forEach(doc =>{
        let adp = new Adopt(doc.data());
        adp.id = doc.id;
        firebase.storage().ref().child('animais/'+adp.id+'.jpg') // Referência do arquivo no servidor
        .getDownloadURL().then( url=>{ // tenta baixar a foto do servidor
          adp.foto = url; // foto baixada com sucesso
        }).catch(()=>{ // foto não existe, pega foto padrão
          adp.foto = "https://firebasestorage.googleapis.com/v0/b/adopt-73e49.appspot.com/o/animais%2FdefaultC.png?alt=media&token=fa6a0a35-8e79-44b7-a367-62b8f1355fff";
        })        
        this.adopts.push(adp);
      });
    });

  }

  downloadFoto(uid : string) : any{
    
    let ref = 'animais/'+uid+'.jpg'; // Pasta do servidor
    let gsReference = firebase.storage().ref().child(ref); // Referência do arquivo no servidor
  
    gsReference.getDownloadURL().then( url=>{ // tenta baixar a foto do servidor
      return url; // foto baixada com sucesso
    }).catch(()=>{ // foto não existe, pega foto padrão
    return "https://firebasestorage.googleapis.com/v0/b/adopt-73e49.appspot.com/o/animais%2FdefaultC.png?alt=media&token=fa6a0a35-8e79-44b7-a367-62b8f1355fff";
    })
  
  }

}
