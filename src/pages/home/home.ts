import { PromocionProvider } from './../../providers/promocion/promocion';
import { SolicitudPage } from './../solicitud/solicitud';
import { AuthProvider} from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteProvider } from '../../providers/cliente/cliente';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
promocion:{
  id:number,
  imagen:string,
};
promociones:Array<{
  id:number,
  id_servicio:number;
  nombre:string;
  descripcion:number,
  porcentaje_descuento:number,
  imagen:string,
}>;
longitu:number;
url_files:string;
perfil:any[];
url_api:any
  promo_mostrar:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public promoService:PromocionProvider,
  public authService: AuthProvider,
  public clienteService:ClienteProvider) {
    this.promociones=[];
    this.perfil=[];
    this.promocion={
      id: 0,
      imagen:''
    };
    this.getPerfil();
  }

  ionViewDidLoad() {
    this.promocion = {
      id:0,
      imagen:''
    }
    this.promociones=[]
    this.url_api= this.authService.ApiUrl();
    this.url_files=this.authService.ApiFile();
    //this.perfil=this.clienteService.getPerfil();
   this.promo_mostrar=[];
    this.getPromociones();
    
    console.log('ionViewDidLoad HomePage');
  }
  gotoSolicitud(){
    this.navCtrl.push(SolicitudPage);
  }

getPromociones(){
  this.promoService.getPromocion().subscribe((resp)=>{
    this.promociones=resp['data'];
    this.filtro();
    console.log('etenten alliii')
    this.asignarPromo();
  },(error)=>{
    console.log(error);
  });
}
getPerfil(){
  let i =0;
  i = Number(localStorage.getItem('id_cliente'));
  console.log(i);
  this.clienteService.getPerfilUser(i).subscribe((resp)=>{
    this.perfil=resp['data'].perfil;
  
  },(error)=>{
    console.log(error);
  });
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
  asignarPromo(){
    if(this.promo_mostrar.length!=0){
      // this.promoService.reservarPromos(this.promo_mostrar);
      // this.promo_mostrar.reverse();
      console.log('aquii');
     this.promocion.id=this.promo_mostrar[0].id;
     this.promocion.imagen=this.promo_mostrar[0].imagen;
     console.log(this.promocion);  
     }
  }
}
