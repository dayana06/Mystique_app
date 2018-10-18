import { PresupuestoProvider } from './../../providers/presupuesto/presupuesto';
import { Component } from '@angular/core';
import { AlertController, NavController, ViewController, NavParams } from 'ionic-angular';
import { PrincipalPage } from '../../pages/principal/principal';
import { TiposProvider } from '../../providers/tipos/tipos';

/**
 * Generated class for the RechazoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'rechazo',
  templateUrl: 'rechazo.html'
})
export class RechazoComponent {

  text: string;
 motivo:any[];
 presu:any[];
 respuesta:{
   id_presupuesto:number,
   id_tipo_respuesta_presupuesto:number,
   descripcion:string;
 }
 presupuesto:any;
  constructor(public viewCtrl : ViewController,
    public navCtrl : NavController, 
    public alertCtrl:AlertController,
    public tipoService:TiposProvider,
    public presuService:PresupuestoProvider,
    public navParams: NavParams) {
    console.log('Hello RechazoComponent Component');
    this.text = 'Hello World';
    this.respuesta={
      id_presupuesto:null,
      id_tipo_respuesta_presupuesto:null,
      descripcion:''
    };
    
    this.ObtMotivos();
    this.presupuesto=this.presuService.getPresu();
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
  confirmar(){
      let alert = this.alertCtrl.create({
        title: '',
        message: '¿Seguro que desea Rechazar?',
        buttons: [
          {
            text: 'SI',
            handler: () => {
              console.log('Cancel clicked');
              this.GuardarRechazo();
              this.viewCtrl.dismiss();
            }
          },
          {
            text: 'No',
            handler: () => {
              console.log('Buy clicked');
              this.viewCtrl.dismiss();
            }
          }
        ]
      });
      
        alert.present(); 
  } 
  GuardarRechazo(){
    this.presupuesto.estado='D';
    this.respuesta.id_presupuesto=this.presupuesto.id;
    this.presuService.updatedPresupuesto(this.presupuesto).subscribe((get)=>{
      console.log(get);
    },(error)=>{
      console.log(error);
    });
    this.tipoService.CrearRespuesta_presupuesto(this.respuesta).subscribe((res)=>{
      console.log(res);
    },(error)=>{
      console.log(error);
    })
    let alert = this.alertCtrl.create({
      title: 'Confirmacion',
      subTitle: 'Continuaremos Trabajando para usted, Gracias',
      buttons: [{
        text:'Cerrar',
      handler:()=>{
        let navTran=alert.dismiss();
          navTran.then(()=>{
            this.navCtrl.setRoot(PrincipalPage);
          });
        return false;
      }
      }],
    });
    alert.present()
  }
  ObtMotivos(){
    this.tipoService.getTipo_respuesta_presupuesto().subscribe((tipo)=>{
      this.motivo=tipo['data'];
      console.log(this.motivo);
    },(error)=>{
      console.log(error);
    })
  }
}
