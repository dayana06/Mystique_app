import {CalificarPage} from './../calificar/calificar';
import {Component} from '@angular/core';
import { AuthProvider } from './../../providers/auth/auth';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {ReclamogenerarPage} from './../reclamogenerar/reclamogenerar';
import {ServicioRProvider } from '../../providers/servicio-r/servicio-r';
import { ClienteProvider } from '../../providers/cliente/cliente';


/**
 * Generated class for the ServiciosRPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicios-r',
  templateUrl: 'servicios-r.html',
})
export class ServiciosRPage {

  pestana: string = "calificar";
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
      id:number,
      id_solicitud:number,
      estado:string}>
  }
  ordenes_no_calificadas:any[];
  ordenes_calificadas:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
     public serviciosrProvider: ServicioRProvider,
     public clienteProvider: ClienteProvider,
     public authService: AuthProvider) {
   
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
    this.ordenes_calificadas=[];
    this.ordenes_no_calificadas=[];
  }
  
  ionViewDidLoad() {
    function flatten(arr) {
      return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
      }, []);
    
    }

    this.url_api= this.authService.ApiUrl();
    console.log(this.serviciosr);
    this.getOrdenes();
    //this.llenarArray();  
  }

    llenarArray(){
      this.ordenes_calificadas=[];
    this.ordenes_no_calificadas=[];
      console.log(this.serviciosr.ordenes);
    for (let i = 0; i < this.serviciosr.ordenes.length; i++) {
      if(this.serviciosr.ordenes[i].estado==='R'){
        this.ordenes_no_calificadas.push(this.serviciosr.ordenes[i]);
      }else{
        if(this.serviciosr.ordenes[i].estado==='C'){
          this.ordenes_calificadas.push(this.serviciosr.ordenes[i]);
        }
      }
    }
    console.log(this.ordenes_no_calificadas);
    console.log(this.ordenes_calificadas);
  }

  getOrdenes(){
    this.serviciosrProvider.getServiciosR(this.clienteProvider.getCliente().id).subscribe(
      (data)=>{
        this.serviciosr=data['data'];
        console.log(this.serviciosr)
        this.llenarArray();  
      },(error)=>{console.log(error)} 
    );}

  Reclamo() {
    let alert = this.alertCtrl.create({
      title: 'Aviso!',   
      subTitle: 'Por Favor Califica nuestros Servicios para poder realizar un reclamo, Gracias',
      buttons: ['Cerrar']
    });
    alert.present();
  }
  calificar(i) {
    this.navCtrl.push(CalificarPage,i)
  }
  Reclamo1(i) {
    this.navCtrl.push(ReclamogenerarPage,i);
  }
}
