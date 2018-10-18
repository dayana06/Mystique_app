import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalificarPage } from './calificar';
import { HomePage} from '../home/home';
@NgModule({
  declarations: [
    CalificarPage,
    HomePage
  ],
  imports: [
    HomePage,
    IonicPageModule.forChild(CalificarPage),
  ],
})
export class CalificarPageModule {}
