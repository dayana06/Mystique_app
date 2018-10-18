import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { PrincipalPage } from '../../pages/principal/principal';
import { CancelarCitaProvider } from './../../providers/cancelar-cita/cancelar-cita';

/**
 * Generated class for the CancelarcitaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cancelarcita',
  templateUrl: 'cancelarcita.html'
})
export class CancelarcitaComponent {
  id_orden:number;
  tincidencia:any;
  rinicidencia:any;
  text: string;
  items:any;
  motivo:string;
  ordena:any;
  incidenciaO:{
    id_orden_servicio:number,
    id_tipo_incidencia:number,
   descripcion:string,

  }
  constructor(public viewCtrl : ViewController,public navCtrl : NavController, public alertCtrl:AlertController, public incidencia: CancelarCitaProvider, public navParams: NavParams) {
    this.tincidencias();
    this.ordena=this.navParams.data;
    this.incidenciaO={
    id_orden_servicio : 0,
     id_tipo_incidencia : 0,
     descripcion : "",
  }
   this.incidenciaO.id_orden_servicio=this.ordena.id;
  console.log(this.tincidencia);
    this.items=[{
      "motivo":"Falta de dinero",  
    },
  {
    "motivo":"Falta de tiempo",
  },
  {
    "motivo":"Otros motivos",    
  }];    

    console.log('Hello CancelarcitaComponent Component');
    this.text = 'Hello World';
  }
 
 
  guardar(){
    this.incidencia.Gincidencia(this.incidenciaO).subscribe((data)=>{
    console.log(data);
    },(error)=>{
      console.log(error);
    })
    console.log(this.incidenciaO.id_orden_servicio);
     }
  closeModal(){
    this.viewCtrl.dismiss();
  
  }

  tincidencias(){
    this.incidencia.getTipoI().subscribe(
      (data)=>{
        this.tincidencia=data['data'];
        console.log(this.tincidencia)
      },(error)=>{console.log(error)}
      
    );
  
    
  }

  
  cancelarcita(){
      let alert = this.alertCtrl.create({
        title: '',
        message: '¿Seguro que desea cancelr su cita?',
        buttons: [
          {
            text: 'SI',
            handler: () => {
              console.log('Cancel clicked');
              this.gotoGuardar();
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
  } gotoGuardar(){
    console.log(this.ordena);
    this.incidencia.Gincidencia(this.incidenciaO).subscribe((data)=>{
      console.log(data);
      },(error)=>{
        console.log(error);
      })
    let alert = this.alertCtrl.create({
      title: 'Confirmacion',
      subTitle: 'Su cita ha sido Cancelada',
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

}
