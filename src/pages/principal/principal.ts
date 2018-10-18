import { ResetPasswordPage } from './../reset-password/reset-password';
import { SolicitudPage } from './../solicitud/solicitud';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, PopoverController } from 'ionic-angular';
import { NotificacionPage } from '../notificacion/notificacion';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { PromocionProvider } from '../../providers/promocion/promocion';
import { ClienteProvider } from '../../providers/cliente/cliente';

/**
 * Generated class for the PrincipalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {
  termino:boolean;
  perfil: any[];
  promo_mostrar: any[];
  promociones: any[];
  public loading:Loading;
  conta: number;
  mensajeSolicitu:any;
  mensajeReclamo:any;
  mensajeComentario:any;
  mensajePromo:any;
  aux:any[];
  aviso:boolean;
  mensajes:Array<{mensaje:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    public socket: Socket,
    public promoService: PromocionProvider,
    public clienteService:ClienteProvider) {
      this.conta = 0;
      this.mensajes=[];
      this.promociones=[];
      this.perfil=[];
      this.termino=true;
      this.getPerfil();
      this.promo_mostrar=[];
      this.aviso=false;
      this.aux=[];
  }
  ionViewDidLoad() {
    this.aviso=false;
    this.nuevaNotificacionReclamo().subscribe(resp=>{
      console.log(resp);
      this.mensajeReclamo=resp;
      if(this.mensajeReclamo.cliente === Number(localStorage.getItem('id_cliente'))){
        this.conta=this.conta + 1;
        this.mensajes.push(this.mensajeReclamo);
        }
       });
     this.nuevasNotificacionesSolicitu().subscribe(resp=>{
       console.log(resp);
       this.mensajeSolicitu=resp;
       console.log(localStorage.getItem('id_cliente'));
      if(this.mensajeSolicitu.cliente ===Number(localStorage.getItem('id_cliente'))){
        console.log('estoy aqui');
        this.conta=this.conta + 1;
        this.mensajes.push(this.mensajeSolicitu);
        }
     });
     this.nuevaNotificacionComentario().subscribe(resp=>{
       console.log(resp);
       this.mensajeComentario=resp;
       if(this.mensajeComentario.cliente === Number(localStorage.getItem('id_cliente'))){
         this.conta=this.conta + 1;
         this.mensajes.push(this.mensajeComentario);
         }
     });
     this.nuevaNotificacionPromo().subscribe(resp=>{
      console.log(resp);
      this.mensajePromo=resp;
      this.mensajes.push(this.mensajePromo);
      this.aviso=true;
      console.log(this.aviso);
      this.aux=this.promo_mostrar;
      this.getPromociones();
      
      console.log(this.promo_mostrar);
      console.log('aqui aqui aqui ');
      if(this.termino==true){
       
      }
        
    });
    console.log('ionViewDidLoad PrincipalPage');
  }
 
  gotoSolicitud(){
    this.navCtrl.push(SolicitudPage)
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }
  verNotificacion(){
    this.revisado();
   let popover = this.popoverCtrl.create(NotificacionPage,this.mensajes);
    popover.present();
  }
 nuevasNotificacionesSolicitu(){   
      let observable = new Observable(observer =>{
        this.socket.on('respuesta_solicitu', resp =>{
          observer.next(resp);
        });
  });
  return observable;
}
  nuevaNotificacionComentario(){
      let observable = new Observable(observer =>{
        this.socket.on('respuesta_comentario', resp =>{
          observer.next(resp);
          console.log(resp);
          })
    });
    return observable;
  }
  nuevaNotificacionReclamo(){
      let observable = new Observable(observer =>{
        this.socket.on('respuesta_reclamo', resp =>{
          observer.next(resp);
          console.log(resp);
          console.log(this.conta);
        });
    });
    return observable;
  }
  nuevaNotificacionPromo(){
    let observable = new Observable(observer =>{
      this.socket.on('creacion_promo', resp =>{
        observer.next(resp);
        console.log(resp);
        console.log(this.conta);
      });
  });
  return observable;
}
  revisado(){
    if(this.conta>0){
      this.conta=this.conta - 1;
    }else if(this.conta == -1){
      this.conta=0;
    }
  }
  getPromociones(){
    this.promoService.getPromocion().subscribe((resp)=>{
      this.promociones=resp['data'];
      console.log(this.promociones);
      this.filtro();
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
      this.getPromociones();
    },(error)=>{
      console.log(error);
    })
  }
  filtro(){
    this.promo_mostrar=[];
    for (let j = 0; j < this.promociones.length; j++) {
      this.promo(this.promociones[j]);
     }
     if(this.aviso){
      console.log('estoy aquiiii si se puee');
      console.log(this.aviso);
      this.comparar()
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
      };
      
        
    }
//------------ Metoo para comparar los arreglos y valiar si hay o no una nueva promocion
 comparar(){
  if(this.aux.length<this.promo_mostrar.length){
       this.conta=this.conta + 1;
       this.aviso=false;
  }else{
    this.aux=[];
    this.aviso=false;
    this.termino=false;
  }
  //----------------------------------------------------------------------
}
}