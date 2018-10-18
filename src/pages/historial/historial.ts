import { Component } from '@angular/core';
import {CalificarPage} from './../calificar/calificar';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {ServicioRProvider } from '../../providers/servicio-r/servicio-r';
import {AuthProvider} from './../../providers/auth/auth';
import {ClienteProvider} from '../../providers/cliente/cliente';

/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  url_api:any;

  serviciosr:{
    id:number,
    nombre:string,
    apellido:string,
    cedula:string,
    telefono:number,
    direccion:string,
    tipo_cliente:string,
    ordenes:Array<{
      id:string,
      id_solicitud,
      estado:string}>
  }
  ordenes_totales:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public serviciosrProvider: ServicioRProvider,
    public authService: AuthProvider,
    public clienteProvider: ClienteProvider){

      this.serviciosr={
        id:0,
        nombre:'',
        apellido:'',
        cedula:'',
        telefono:0,
        direccion:'',
        tipo_cliente:'',
        ordenes:[]
      }
      this.ordenes_totales=[];
  }

  ionViewDidLoad() {
    this.url_api= this.authService.ApiUrl();
    console.log(this.serviciosr);
    this.getOrdenes(); }
  
  llenar(){
    this.ordenes_totales.reverse();
    console.log(this.serviciosr.ordenes);
    for (let i = 0; i < this.serviciosr.ordenes.length; i++){
     
        this.ordenes_totales.push(this.serviciosr.ordenes[i]);
  }

  console.log(this.ordenes_totales);
}

getOrdenes(){
  this.serviciosrProvider.getServiciosR(this.clienteProvider.getCliente().id).subscribe(
    (data)=>{
      this.serviciosr=data['data'];
      console.log(this.serviciosr)
      this.llenar();  
    },(error)=>{console.log(error)} 
  );}

  calificar(i) {
    this.navCtrl.push(CalificarPage,i)
  }
}
