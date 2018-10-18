import { ClienteProvider } from './../../providers/cliente/cliente';
import { Socket } from 'ng-socket-io';
import { PrincipalPage } from './../principal/principal';
import {ReclamoProvider} from '../../providers/reclamo/reclamo';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';

/**
 * Generated class for the ReclamogenerarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reclamogenerar',
  templateUrl: 'reclamogenerar.html',
})
export class ReclamogenerarPage {
  
  @ViewChild(Nav) nav: Nav;
  opinion: string;
  tipo_reclamo:any[];
  comentario: any[];
  reclamo: {
    id_detalle_servicio:number;
    id_tipo_reclamo:number;
    descripcion:string;
    id_cliente;
    id_orden_servicio;
  }
  url_api:any;
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

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl: AlertController,
     public reclamoProvider: ReclamoProvider,
     public authService: AuthProvider,
      public socket:Socket,
      public  cliProvider:ClienteProvider,
      public loadingCtrl:LoadingController) {
       this.tipo_reclamo=[];
       this.comentario=[];
       this.reclamo={
         id_detalle_servicio:0,
         id_tipo_reclamo:0,
         descripcion:'',
         id_cliente:0,
         id_orden_servicio:0,
       }
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

        getTiporeclamo(){
    this.reclamoProvider.getTipo_reclamo().subscribe((data)=>
    { this.tipo_reclamo=data['data'];
      console.log(this.tipo_reclamo)
      },(error)=>{console.log(error)} 
    );}

    CambiarEstado(){
      this.orden.estado='PG';
      this.reclamoProvider.ActOden(this.orden.id, this.orden).subscribe((data)=>{
        console.log(data);
      },(error)=>{
        console.log(error);
      })
    }

    guardarReclamo(){
      this.reclamo.id_orden_servicio=this.orden.id;
      this.reclamo.id_cliente=this.orden.id_cliente;
      console.log(this.reclamo);
      this.CambiarEstado()
     this.reclamoProvider.DescripcionReclamo(this.reclamo).subscribe((data)=>{
       
       console.log(data);
       this.notificar();
     },(error)=>{
       console.log(error);
     })
      let alert = this.alertCtrl.create({
          title: 'Hola!',
          subTitle: 'Solicitud de garantia exitosa, Gracias por preferirnos',
          buttons: [{
            text:'Cerrar',
          handler:()=>{
            let navTran=alert.dismiss();
              navTran.then(()=>{
              this.Loading()
               // this.navCtrl.popTo(PrincipalPage);
              });
            return false;
          }
          }],
        });
        alert.present()
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


  ionViewDidLoad() {
    this.url_api= this.authService.ApiUrl();
//console.log(this.getTiporeclamo);
    this.getTiporeclamo();
    console.log('ionViewDidLoad CalificarPage');
  }
  notificar(){
    this.socket.emit('nuevo_reclamo',{
        titulo: 'Nuevo reclamo',
        mensaje: this.cliProvider.getCliente().nombre+' '+this.cliProvider.getCliente().apellido+ 'ha hecho un reclamo',
        fecha: new Date()
        });
  }
}
