import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdoptPage } from './adopt';

@NgModule({
  declarations: [
    AdoptPage,
  ],
  imports: [
    IonicPageModule.forChild(AdoptPage),
  ],
})
export class AdoptPageModule {}
