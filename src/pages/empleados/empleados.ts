import { ComentarioProvider } from './../../providers/comentario/comentario';
import { ComentarPage } from './../comentar/comentar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EmpleadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-empleados',
  templateUrl: 'empleados.html',
})
export class EmpleadosPage {
empleados:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public comentProvider: ComentarioProvider) {
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
      },
    ]
  }
 // Cerrar(data){
  // this.comentProvider.setEmpleado(data);
   // this.navCtrl.push(ComentarPage,data);
 // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpleadosPage');
  }
  ionViewWillEnter(){
    console.log(this.navParams.data);
  } 
  ionViewWillLeave(data){
  
  }

}
