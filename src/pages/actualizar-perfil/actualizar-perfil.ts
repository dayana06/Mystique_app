import { GustosPreferenciasPage } from './../gustos-preferencias/gustos-preferencias';
import { ClienteProvider } from './../../providers/cliente/cliente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { TiposProvider } from '../../providers/tipos/tipos';

/**
 * Generated class for the ActualizarPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-actualizar-perfil',
  templateUrl: 'actualizar-perfil.html',
})
export class ActualizarPerfilPage {
  perfilgustos:any[];
  sexo:string;
  id_cliente:number;
  constructor(public navCtrl: NavController,
    public toastCtrl:ToastController, 
    public navParams: NavParams,
    
    public clienteService: ClienteProvider,
    public moCtrl: ModalController) {
    this.perfilgustos=[];
    this.perfilgustos=this.navParams.data
    this.id_cliente=0;
    this.id_cliente=this.clienteService.getCliente().id;
  }

  ionViewDidLoad() {
    
    this.sexo='';
    this.sexo=this.clienteService.getSexoCliente();
    console.log('ionViewDidLoad ActualizarPerfilPage');
  }
  ionViewWillLeave(){
    }
  eliminar(gus,i){
    let g={
      id_perfil:0,
      id_cliente:0,
      id_valor_parametro:0,
      estatus:''
    }
    g.id_perfil=Number(gus.id_perfil);
    g.id_cliente=Number(gus.id_cliente);
    g.id_valor_parametro=Number(gus.id_valor_parametro);
    g.estatus='I';
    console.log(g);
    this.clienteService.actualizarPerfil(g).subscribe((res)=>{
      console.log(res);
      this.perfilgustos.splice(i,1);
      let toast = this.toastCtrl.create({
        message: 'Elemento Eliminado',
        duration: 3000,
        position: 'bottom'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
    },(error)=>{
      console.log(error);
    })
  }
  agregar(){
    let moal = this.moCtrl.create(GustosPreferenciasPage);
    moal.present();
  }

}
