import { NotificacionProvider } from './../providers/notificacion/notificacion';
import { PrincipalPage } from './../pages/principal/principal';
import { PromocionesPage } from './../pages/promociones/promociones';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import { PerfilPage } from '../pages/perfil/perfil';
import { SolicitudesPage } from '../pages/solicitudes/solicitudes';
import { TipsPage } from '../pages/tips/tips';
import {ReclamosPage} from '../pages/reclamos/reclamos';
import {ServiciosRPage} from '../pages/servicios-r/servicios-r';
import {CitasPage} from '../pages/citas/citas';
import {SugerenciasPage} from '../pages/sugerencias/sugerencias';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
//import { LocalNotifications } from '@ionic-native/local-notifications';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any,icon:string, bage:number}>
  notificacion:any[];
  auxnotificaciones: any[];
  nuevanotificacion:any;
  resp1:any;
  resp2:any;
  resp3:any;
 public cont: number;
  constructor(platform: Platform, statusBar: StatusBar,
     splashScreen: SplashScreen,
     public loadingCtrl:LoadingController,
    // private localNotifications: LocalNotifications,
    private notiService:NotificacionProvider,
    public socket: Socket ) {

    this.pages=[
      {title: 'Inicio', component: PrincipalPage, icon:'home', bage:0},
      {title: 'Perfil', component: PerfilPage, icon:'contact', bage:0},
      {title: 'Citas', component:CitasPage,icon:'calendar', bage:0},
      {title: 'Solicitudes',component:SolicitudesPage,icon:'paper-plane', bage:0},
      {title: 'Reclamos',component: ReclamosPage,icon:'filing',bage:0},
      {title: 'Servicios Recibidos',component: ServiciosRPage,icon:'list-box', bage:0},
      {title: 'Buzon de Comentarios',component:SugerenciasPage,icon:'mail', bage:0},
      {title: 'Promociones',component:PromocionesPage,icon:'star', bage:0},
      {title: 'Consejos',component:TipsPage,icon:'megaphone', bage:0}
    ];
    this.cont = 0;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      if (localStorage.getItem('id_cliente')!=null) {  
      this.nuevasNotificacionesSolicitu().subscribe(resp =>{
         console.log(resp);
         this.resp1=resp;
         console.log(this.resp1.cliente);
         if(this.resp1.cliente ===Number( localStorage.getItem('id_cliente'))){
           console.log('si entre');
          this.pages[3].bage=this.pages[3].bage + 1;
         }
      });
      this.nuevaNotificacionComentario().subscribe(resp =>{
        console.log(resp);
        this.resp2=resp;
        console.log(this.resp2);
        if(this.resp1.cliente === Number(localStorage.getItem('id_cliente'))){
        this.pages[6].bage=this.pages[6].bage + 1;
      }});

      this.nuevaNotificacionReclamo().subscribe(resp => {
        console.log(resp);
        this.resp3=resp;
        console.log(this.resp3);
        if(this.resp1.cliente === Number(localStorage.getItem('id_cliente'))){
          this.pages[4].bage=this.pages[4].bage + 1;
        }
      });
    }
    //  setInterval(() => { 
    //    this.consultarNotificaciones();
    // }, 10000);
    });
    

    }
    Loading(p) {
      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
      });
    
      loading.present();
    
      setTimeout(() => {
        if(p.bage > 0){
          p.bage = p.bage -1;
        }else if(p.bage == 0){
          p.bage = 0;
        }
        this.nav.setRoot(p.component);
      }, 2000);
    
      setTimeout(() => {
        loading.dismiss();
      }, 5000);
    }
    //openPage(p){
     // this.nav.setRoot(p.component);
 // }
  exit(){
    localStorage.clear();
    this.nav.setRoot(LoginPage);
  }
  consultarNotificaciones(){
    this.auxnotificaciones=this.notificacion;
    this.notiService.getNotificaciones().subscribe((resp)=>{
      this.notificacion=resp['data'];
      this.comparacion();    
    },(error)=>{
      console.log(error);
    })
  }
  comparacion(){
    if(this.auxnotificaciones){
      if(this.auxnotificaciones.length !== this.notificacion.length){
        this.nuevanotificacion = this.notificacion[this.notificacion.length-1];
      }
    }
  }
  nuevasNotificacionesSolicitu(){
   
      let observable = new Observable(observer =>{
        this.socket.on('respuesta_solicitu', resp =>{
          observer.next(resp);
          if(resp.cliente === localStorage.getItem('id_cliente'))
          console.log(resp);
         })
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
         
        })
      });
      return observable;
    }


}
