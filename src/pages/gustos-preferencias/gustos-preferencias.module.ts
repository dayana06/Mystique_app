import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GustosPreferenciasPage } from './gustos-preferencias';

@NgModule({
  declarations: [
    GustosPreferenciasPage,
  ],
  imports: [
    IonicPageModule.forChild(GustosPreferenciasPage),
  ],
})
export class GustosPreferenciasPageModule {}
