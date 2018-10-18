import { NgModule } from '@angular/core';
import { ListaPeluqueriaComponent } from './lista-peluqueria/lista-peluqueria';
import { ServrecomendadoComponent } from './servrecomendado/servrecomendado';
import { ArtrecomendadoComponent } from './artrecomendado/artrecomendado';
import { CancelarcitaComponent } from './cancelarcita/cancelarcita';
import { RechazoComponent } from './rechazo/rechazo';
import {ListempleadoComponent} from './listempleado/listempleado';
import  {ListservicioComponent} from './listservicio/listservicio';

@NgModule({
	declarations: [
    ListaPeluqueriaComponent,
    ServrecomendadoComponent,
    ArtrecomendadoComponent,
    CancelarcitaComponent,
    RechazoComponent,
    ListempleadoComponent,
    ListservicioComponent,
    ],
	imports: [],
	exports: [
	
    ListaPeluqueriaComponent,
    ServrecomendadoComponent,
    ArtrecomendadoComponent,
    CancelarcitaComponent,
    RechazoComponent,
    ListservicioComponent,
    ListempleadoComponent,
    ]
})
export class ComponentsModule {}
