import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
import {ComentarPage} from '../comentar/comentar';
import { ComentarioProvider } from './../../providers/comentario/comentario';
import { ClienteProvider } from './../../providers/cliente/cliente';

/**
 * Generated class for the SugerenciasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sugerencias',
  templateUrl: 'sugerencias.html',
})
export class SugerenciasPage {
  id_cli:number;
  id_comen : any;
  tcomentarios:any[];
  Sugerencias:any;
  RSugerencias:any[];
  Comentario:any[];
  lista: Array<{id_co: number }>=[];
  respuesta:any;
  historico:any[]=[];
  respuestas:any[]=[];
 
  comentarios:string='historico';
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,public comenProvider: ComentarioProvider, public cliProvider: ClienteProvider ) {

   this.comentario();
   this.Respuestas();
   this.Comentario=[];
   this.RSugerencias=[];
   this.tcomentarios=[];
  }
  comentario(){
   this.id_cli=this.cliProvider.getCliente().id;
    this.comenProvider.getComentario(this.id_cli).subscribe(
      (data)=>{
        this.Comentario=data['data'].comentarios;
        this.Comentario.reverse();
        console.log(this.Comentario)
      },(error)=>{console.log(error)}
      
    );
  }

  Respuestas(){
    this.comenProvider.getResComentario().subscribe(
      (data)=>{
        this.RSugerencias=data['data'];
        console.log(this.RSugerencias);
        this.filtroRespuestas();
  },(error)=>{console.log(error)}
      
);
    
  }
  filtroRespuestas(){
    this.tcomentarios=[];    
    for (let i = 0; i < this.RSugerencias.length; i++) {
      if (this.RSugerencias[i].id_cliente=== this.id_cli) {
        this.tcomentarios.push(this.RSugerencias[i]);
      }
    }
    this.tcomentarios.reverse();
  }
  ionViewDidLoad() {
    this.Comentario=[];
   this.RSugerencias=[];
    this.comentario();
    this.Respuestas();
    console.log('ionViewDidLoad SugerenciasPage');
    console.log(this.RSugerencias);
  }
  loading(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
    });
  
    loading.present();
  
    setTimeout(() => {
      this.gotoNuevoComentario();
    }, 3000);
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }
  gotoNuevoComentario(){
    this.navCtrl.push(ComentarPage);
  }
  doRefresh(refresher: Refresher){
    this.comentario();
    this.Respuestas();
    setTimeout(() => {
      refresher.complete();
    }, 5000);
  }
}
