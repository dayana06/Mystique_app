import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ComentarPage} from '../../pages/comentar/comentar';
/**
 * Generated class for the ListempleadoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'listempleado',
  templateUrl: 'listempleado.html'
})
export class ListempleadoComponent {

  text: string;
  empleados:any
  constructor(public navCtrl: NavController) {
    console.log('Hello ListempleadoComponent Component');
    this.text = 'Hello World';
    this.empleados=[
    {
      nombre:'Claudia Moreno',
      foto :'assets/imgs/peluquera1.jpg',
      especialidad:'Peinados',
      codigo:'0001'
    },
    {
      nombre:'Lorena Rojas',
      foto :'assets/imgs/peluquera2.jpg',
      especialidad:'Cortes',
      codigo:'0004'
    },
    {
      nombre:'Maria Navarro',
      foto :'assets/imgs/peluquera3.jpg',
      especialidad:'Quimicos Capilares',
      codigo:'0002'
    }
  ]
  }
  Cerrar(data){
    this.navCtrl.popTo(ComentarPage,data)
  }
}
