import { ServicioRProvider } from './../../providers/servicio-r/servicio-r';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {AgendaPage} from './../agenda/agenda';
import{ReclamoProvider} from '../../providers/reclamo/reclamo';
/**
 * Generated class for the ReclamosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reclamos',
  templateUrl: 'reclamos.html',
})
export class ReclamosPage {
  recla:any;
  respuesta:any;
  ordenes:any[];
  orden:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public reclamoService: ReclamoProvider,
  public serviRService:ServicioRProvider, public loadingCtrl:LoadingController) {
    this.ordenes=[];
    this.orden=null;
 this.RespuestaR();
 this.getOrenes();
 this.encontrarOren();
  }

  RespuestaR(){
    this.reclamoService.getRespuesta().subscribe(
      (data)=>{
        this.respuesta=data['data'];
        console.log(this.respuesta)
      },(error)=>{
        console.log(error)
      });
  }
  getOrenes(){
    let i = 0;
    i=Number(localStorage.getItem('id_cliente'));
    this.serviRService.getOrdenes().subscribe((resp)=>{
      this.ordenes=resp['data'];
      console.log(this.ordenes);
      this.encontrarOren();
    },(error)=>{
      console.log(error);
    });
  }

  ionViewDidLoad() {
    this.RespuestaR();
    console.log('ionViewDidLoad ReclamosPage');
    console.log(this.orden)
    this.encontrarOren();
  }
  verCita()
  { let c="garantia"
    let loading = this.loadingCtrl.create({
        spinner: 'crescent',
      });
    
      loading.present();
      setTimeout(() => {
      this.navCtrl.push(AgendaPage,{soli:this.orden, origen:c})
      }, 3000);
    
      setTimeout(() => {
        loading.dismiss();
      }, 6000);
    
  }

encontrarOren(){
  for (let i = 0; i <this.ordenes.length; i++) {
      if (this.ordenes[i].estado==='V') {
        this.orden=this.ordenes[i];
        console.log(this.orden);
      }
    }
  }
}
