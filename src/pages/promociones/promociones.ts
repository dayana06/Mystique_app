import { ClienteProvider } from './../../providers/cliente/cliente';
import { AuthProvider } from './../../providers/auth/auth';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
import { SolicitudPage } from '../solicitud/solicitud';
import {PromocionProvider} from '../../providers/promocion/promocion';

/**
 * Generated class for the PromocionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promociones',
  templateUrl: 'promociones.html',
})
export class PromocionesPage {
  url_api:any
  promociones: any[];
  url_files:any;
  perfil:any[];
  promo_mostrar:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public promocionService: PromocionProvider,
  public authService: AuthProvider,
public clienteService:ClienteProvider) {
    this.perfil=[];
  }
  getPromociones(){
    this.promocionService.getPromocion().subscribe(
      (data)=>{
        this.promociones=data['data'];
        this.filtro();
        this.promocionService.reservarPromos(this.promo_mostrar);
      },(error)=>{console.log(error)}
    );
  
  }
  doRefresh(refresher: Refresher){
    this.promocionService.getPromocion().subscribe(
      (data)=>{
        this.promociones=data['data'];
        this.filtro()
        this.promocionService.reservarPromos(this.promo_mostrar);
      },(error)=>{console.log(error)}
    );
    setTimeout(() => {
      refresher.complete();
    }, 5000);
  }
  ionViewDidLoad() {
    this.promociones=[]
    this.url_api= this.authService.ApiUrl();
    this.url_files=this.authService.ApiFile();
    this.getPromociones();
    this.getPerfil();
    //this.perfil=this.clienteService.getPerfil();
   this.promo_mostrar=[];
   
    console.log(this.promociones);
  }
  adquirirPromo(item){
    let pro='promo'
    this.navCtrl.push(SolicitudPage,{item,pro});
  }
  getPerfil(){
    let i = this.clienteService.getCliente().id;
    this.clienteService.getPerfilUser(i).subscribe((resp)=>{
      this.perfil=resp['data'].perfil;
      console.log(this.perfil);
    },(error)=>{
      console.log(error);
    })
  }
  filtro(){
    this.promo_mostrar=[];
    for (let j = 0; j < this.promociones.length; j++) {
      this.promo(this.promociones[j]);
     }
  }

  promo(pro){
    let promocion={
      detalle_promocion:[],
    };
    let cont=0;
    promocion.detalle_promocion=pro.detalle_promocion;
    for (let i = 0; i < promocion.detalle_promocion.length; i++) {
      for (let j = 0; j < this.perfil.length; j++) {
        if (this.perfil[j].id_valor_parametro===promocion.detalle_promocion[i].id_valor_parametro) {
          cont++;
          }
        }
      }
     
      if(cont===promocion.detalle_promocion.length){
        this.promo_mostrar.push(pro);
      }
    }
}