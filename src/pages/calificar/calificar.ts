import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ServicioRProvider } from '../../providers/servicio-r/servicio-r';
import { AuthProvider } from './../../providers/auth/auth';
import { CalificarProvider } from '../../providers/calificar/calificar';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ClienteProvider } from '../../providers/cliente/cliente';
import {ServiciosRPage} from './../servicios-r/servicios-r';
import { PrincipalPage } from '../principal/principal';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';

/**
 * Generated class for the CalificarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calificar',
  templateUrl: 'calificar.html',
})
export class CalificarPage {

  @ViewChild(Nav) nav: Nav;
  calificacion: number;
  c:any;
  criterio: any[];
  ordenes_no_calificadas:any[];
  ordenes_calificadas:any[];
  califi:{
    id_orden_servicio:number,
    servicios_calificados:any[];
    criterios_calificados:any[];
  }
  orden:{
    id:number,
    nombre:string,
    apellido:string,
    id_cliente:number,
    id_solicitud:number,
    estado:string,
    tipo_cliente:string,
    servicios_realizados:any[];
  }
  color: { backgroundcolor: '#fd0087' };
  visible: Boolean = true;
  Serviciovisible: Boolean;
  id: number;
  url_api:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public calificarProvider: CalificarProvider,
     public alertCtrl: AlertController,
     public authService: AuthProvider,
     public serviciosrProvider: ServicioRProvider,
     public loadingCtrl:LoadingController,
     public clienteProvider: ClienteProvider) {
      this.califi={
        id_orden_servicio:0,
        servicios_calificados:[],
        criterios_calificados:[]
      }
      this.criterio=[];
      this.ordenes_calificadas=[];
      this.ordenes_no_calificadas=[];
      this.califi.id_orden_servicio = this.navParams.data.id;
      console.log(this.navParams.data)
      this.calificacion =4;
      this.orden={
        id:0,
        nombre:"",
        apellido:'',
        id_cliente:0,
        id_solicitud:0,
        estado:'',
        tipo_cliente:'',
        servicios_realizados:[]
      }
      this.orden=this.navParams.data;
      console.log(this.orden)
  }

  Criterio(){
    this.calificarProvider.getCriterio().subscribe((data)=>
    { this.criterio=data['data'];
      console.log(this.criterio)
      },(error)=>{console.log(error)} 
    );}

    califico(item,i){
      let c ={
        id_criterio:0,
        puntuacion:0,
      }
  c.id_criterio=item.id;
  c.puntuacion=this.calificacion;
  this.califi.criterios_calificados.push(c);
  this.criterio.splice(i,1);
    }

    calificoSer(servicio,i){
      let c ={
        id_detalle_servicio:0,
        puntuacion:0,
      }
      console.log(servicio)
  c.id_detalle_servicio=servicio.id_servicio;
  c.puntuacion=this.calificacion;
  this.califi.servicios_calificados.push(c);
  this.orden.servicios_realizados.splice(i,1);
    }

  guardarCalificacion(){
    console.log(this.califi);
    this.actualizarOrden()
    this.calificarProvider.Calificacion(this.califi).subscribe((data)=>{
     console.log(data);
   },(error)=>{
     console.log(error);
   })
    let alert = this.alertCtrl.create({
        title: 'Hola!!',
        subTitle: 'Gracias por calificar, apreciamos tu tiempo',
        buttons: [{
          text:'Cerrar',
        handler:()=>{
          let navTran=alert.dismiss();
            navTran.then(()=>{
              this.Loading()
             // this.navCtrl.setRoot(PrincipalPage)
            });
          return false;
        }
        }],
      });
      alert.present()
    }

  ionViewDidLoad() {
    this.url_api= this.authService.ApiUrl();
    console.log(this.orden);
    this.Criterio();
    console.log('ionViewDidLoad CalificarPage');
  }

  verServicio() {
    this.visible = false;
    this.Serviciovisible = true;
  }

  Loading() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
    });
  
    loading.present();
  
    setTimeout(() => {
      this.navCtrl.setRoot(PrincipalPage);
    }, 1000);
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }

  actualizarOrden(){
    this.orden.estado='C';
    this.calificarProvider.ActOden(this.orden.id, this.orden).subscribe((data)=>{
      console.log(data);
    },(error)=>{
      console.log(error);
    })
  }

}

