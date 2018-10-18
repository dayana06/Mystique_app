import { SolicitudProvider } from './../../providers/solicitud/solicitud';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RechazoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rechazo',
  templateUrl: 'rechazo.html',
})
export class RechazoPage {
rechazo:{
  id_tipo_respuesta:number;
  descripcion:string;
  fecha_creacion:Date;
}
id_solicitud:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public soliciService:SolicitudProvider) {
    this.rechazo={
      id_tipo_respuesta:0,
      descripcion:'',
      fecha_creacion:null,
    }
    this.id_solicitud=this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RechazoPage');
    this.soliciService.respuestasolicitud(this.id_solicitud).subscribe((resp)=>{
      this.rechazo=resp['data'];
      console.log(this.rechazo);
    },(error)=>{
      console.log(error);
    })
  }

  buscarRespuesta(){

  }
}
