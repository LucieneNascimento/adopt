import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';

@IonicPage()
@Component({
  selector: 'page-donate',
  templateUrl: 'donate.html',
})
export class DonatePage {

  formGroup: FormGroup;
  firestore = firebase.firestore();

  loader = this.loadingCtrl.create({content: "Aguarde...",duration: 3000});
  toast(text : string){
    let toast = this.toastCtrl.create({message: 'Seu pet foi cadastrado no sistema de adoção',duration: 3000,position: 'bottom'});
    toast.present();
  }


  constructor(public navCtrl: NavController, 
    public formBuilder : FormBuilder,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private file: File,
    private fileChooser: FileChooser,
) {
    this.form();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonatePage');
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
    this.firestore.collection("doacaoAnimal").add(this.formGroup.value) // tenta cadastrar
      .then(ref => { // Cadastro sucesso
        this.loader.dismiss(); // <----- Retira o loading
        this.toast('Cadastrado com sucesso');// <----- Exibe mensagem
        this.navCtrl.push('AdoptPage');
    }).catch(err => { // Cadastro com erro
      this.loader.dismiss();// <----- Retira o loading
      this.toast(err.message); // <----- Exibe mensagem
    });
  }

  escolha(){
    this.fileChooser.open().then((uri)=>{
      alert(uri);

      this.file.resolveLocalFilesystemUrl(uri).then((newUrl)=>{
        alert(JSON.stringify(newUrl));

        let dirPath = newUrl.nativeURL;
        let dirPathSegments = dirPath.split('/')
        dirPathSegments.pop()
        dirPath = dirPathSegments.join('/')

        this.file.readAsArrayBuffer(dirPath, newUrl.name).then(async (buffer)=>{
          await this.upload(buffer, newUrl.name);
        })
      })
    })
  }

  async upload(buffer, name){
    let blob = new Blob([buffer], { type: "image/jpeg"});

    let storage = firebase.storage();

    storage.ref('images/' + name).put(blob).then((d)=>{
      alert("OK");
    }).catch((error)=>{
      alert(JSON.stringify(error))
    })


  }
}
