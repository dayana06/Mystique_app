import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PresupuestoPage } from './presupuesto';

@NgModule({
  declarations: [
    PresupuestoPage,
  ],
  imports: [
    IonicPageModule.forChild(PresupuestoPage),
  ],
})
export class PresupuestoPageModule {}
