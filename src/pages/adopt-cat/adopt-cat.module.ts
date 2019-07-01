import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdoptCatPage } from './adopt-cat';

@NgModule({
  declarations: [
    AdoptCatPage,
  ],
  imports: [
    IonicPageModule.forChild(AdoptCatPage),
  ],
})
export class AdoptCatPageModule {}
