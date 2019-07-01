import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { Adopt } from '../../model/adopt';


@IonicPage()
@Component({
  selector: 'page-adopt-dog',
  templateUrl: 'adopt-dog.html',
})
export class AdoptDogPage {
  firestore = firebase.firestore();
  adopts : Adopt [] = [];
  uid : string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,  
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
      
      this.listaAdopt();
    }
    
  ionViewDidLoad() {
  }

  listaAdopt(){
    var ref = firebase.firestore().collection("doacaoAnimal").where("tipo","==","Cachorro");
    ref.get().then(query =>{
      
      query.forEach(doc =>{
        let adp = new Adopt(doc.data());
        adp.id = doc.id;
        firebase.storage().ref().child('animais/'+adp.id+'.jpg') // Referência do arquivo no servidor
        .getDownloadURL().then( url=>{ // tenta baixar a foto do servidor
          adp.foto = url; // foto baixada com sucesso
        }).catch(()=>{ // foto não existe, pega foto padrão
          adp.foto = "https://firebasestorage.googleapis.com/v0/b/adopt-73e49.appspot.com/o/animais%2FdefaultD.jpg?alt=media&token=30ddfa34-816e-4915-89e0-a3a1fba68ab9";
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
      return "https://firebasestorage.googleapis.com/v0/b/adopt-73e49.appspot.com/o/animais%2FdefaultD.jpg?alt=media&token=30ddfa34-816e-4915-89e0-a3a1fba68ab9";
    })
  
  }
}
