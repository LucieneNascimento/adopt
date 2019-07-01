import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdoptDogPage } from './adopt-dog';

@NgModule({
  declarations: [
    AdoptDogPage,
  ],
  imports: [
    IonicPageModule.forChild(AdoptDogPage),
  ],
})
export class AdoptDogPageModule {}
