import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonateCPage } from './donate-c';

@NgModule({
  declarations: [
    DonateCPage,
  ],
  imports: [
    IonicPageModule.forChild(DonateCPage),
  ],
})
export class DonateCPageModule {}
