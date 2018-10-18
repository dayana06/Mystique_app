import { ClienteProvider } from './../../providers/cliente/cliente';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
import{ConsejoProvider} from '../../providers/consejo/consejo';
/**
 * Generated class for the TipsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tips',
  templateUrl: 'tips.html',
})
export class TipsPage {
  tips:any[];
  url_api:any;
  url_file:any;
  tips_personal:any[];
  perfil:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public consejoService: ConsejoProvider, public authService: AuthProvider,
    public clienteService:ClienteProvider) {
    this.tips=[]
   this.url_file= this.authService.ApiFile();
   this.perfil=[];
    this.getPerfil();
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
consejo(){
  this.consejoService.getConsejo().subscribe(
    (data)=>{
      this.tips=data['data'];
      console.log(this.tips)
      this.filtro();
      this.consejoService.reservarConsejos(this.tips_personal);
    },(error)=>{console.log(error)}
    
  );
  
}
doRefresh(refresher: Refresher){
  this.consejoService.getConsejo().subscribe(
    (data)=>{
      this.tips=data['data'];
      this.filtro();
      this.consejoService.reservarConsejos(this.tips_personal);
    },(error)=>{console.log(error)}
  );
  setTimeout(() => {
    refresher.complete();
  }, 5000);
}
  ionViewDidLoad() {
    this.url_api= this.authService.ApiUrl();
    this.getPerfil();
    this.tips=[];

   this.consejo();
  console.log(this.tips);
  }
  filtro(){
    this.tips_personal=[];
    for (let j = 0; j < this.tips.length; j++) {
      console.log('ahora va al siguiente'+j);
      this.consejos(this.tips[j]);
     }
  }

  consejos(con){
    let consejo={
      detalle_consejo:[],
    };
    let cont=0;
    consejo.detalle_consejo=con.detalle_consejo;
    for (let i = 0; i < consejo.detalle_consejo.length; i++) {
      for (let j = 0; j < this.perfil.length; j++) {
        if (this.perfil[j].id_valor_parametro===consejo.detalle_consejo[i].id_valor_parametro) {
          cont++;
          }
        }
      }
     
      if(cont===consejo.detalle_consejo.length){
        this.tips_personal.push(con);
      }else{
        console.log('no lo inserto');
      }
    }
  
}
