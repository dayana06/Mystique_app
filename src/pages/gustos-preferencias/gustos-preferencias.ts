import { ActualizarPerfilPage } from './../actualizar-perfil/actualizar-perfil';
import { PerfilPage } from './../perfil/perfil';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ClienteProvider } from './../../providers/cliente/cliente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { TiposProvider } from '../../providers/tipos/tipos';

/**
 * Generated class for the GustosPreferenciasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gustos-preferencias',
  templateUrl: 'gustos-preferencias.html',
})
export class GustosPreferenciasPage {
  parametros:any[];
  tipo_parametro:any[];
  valor_parametros:any[];
  valor_mostrar:any[];
  parametros_mostrar:any[];
  parametro_select:number;
  gustos:number;
  perfil:{
    id_cliente:number;
    id_valor_parametro:number;
  }
  array:any[];
  pre_select:any[];
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private tipoService: TiposProvider,
      private viewCtrl : ViewController,
    private clienteService:ClienteProvider,
    private alertCtrl:AlertController,
    private loadCtrl:LoadingController ) {
    this.parametro_select=null;
    this.tipo_parametro=[];
    this.parametros=[];
    this.valor_parametros=[];
    this.gustos=null;
    this.obtTipo_Parametros();
    this.optParametros();
    this.obtValorParametro();
      this.array=[];
      this.valor_mostrar=[];
  }

  ionViewDidLoad() {
   
    this.parametro_select=null;
    this.perfil={
      id_cliente:this.clienteService.getCliente().id,
      id_valor_parametro:null
    };
    this.array=this.clienteService.getPerfil();
    this.pre_select=[];
    console.log('ionViewDidLoad GustosPreferenciasPage');
    this.obtTipo_Parametros();
    this.optParametros();
    this.obtValorParametro();
    this.valor_mostrar=[];
  }
  obtTipo_Parametros(){
    this.tipoService.getTipos_parametro().subscribe((data)=>{
      console.log(data);
      this.tipo_parametro=data['data'];
      this.clasificar();
      this.clasificar_valores();
    },(error)=>{
      console.log(error);
    })
  }
  optParametros(){
    this.tipoService.getParametros().subscribe((data)=>{
      this.parametros=data['data'];
      console.log(this.parametros);
    },(error)=>{
      console.log(error);
    })
  }
  obtValorParametro(){
    this.tipoService.getValorParametro().subscribe((data)=>{
      this.valor_parametros= data['data'];
      console.log(this.valor_parametros);
    })
  }
  clasificar(){
    for (let i = 0; i < this.tipo_parametro.length; i++) {
      if(this.tipo_parametro[i].clasificacion === 'GP'){
        this.gustos = this.tipo_parametro[i].id
        console.log(this.gustos);
      }else{
        console.log('no entro');
      } 
    }
    console.log(this.gustos);
  }
  //Metoo para solo asignar parametros e tipo gustos y preferencias
  clasificar_valores(){
    this.parametros_mostrar=[];
    for (let j = 0; j < this.parametros.length; j++) {
      if(this.parametros[j].id_tipo_parametro===this.gustos){
        this.parametros_mostrar.push(this.parametros[j])
        console.log(this.parametros[j]);
      }
    }
    console.log(this.parametros_mostrar);
  }
  opcionesParametro(){
    console.log(this.parametro_select)
    //this.valor_mostrar=[]
    this.obtValorParametro();
    console.log(this.valor_parametros.length);
    if(this.valor_parametros.length!=0){
    for (let l = 0; l < this.valor_parametros.length; l++) {
      if(this.valor_parametros[l].id_parametro===this.parametro_select){
            this.valor_mostrar.push(this.valor_parametros[l]);
          }
    }
    this.filtro();
  }
    
  }
  filtro(){
    this.array=[];
    for (let i = 0; i < this.valor_mostrar.length; i++) {
      for (let j = 0; j < this.array.length; j++) {
          if(this.valor_mostrar[i].id === this.array[j].id_valor_parametro){
          this.valor_mostrar.splice(i,1);
          break;
          }
      }
      
    }
  }
  agregar(i,inex){
    let p = {
      id_cliente:0,
      id_valor_parametro:0
    }
    //p.id_cliente=null;
    //p.id_valor_parametro=null;
    p.id_cliente=this.clienteService.getCliente().id;
    p.id_valor_parametro=i.id;
    console.log(p);
    //this.valor_mostrar.splice(inex,1);
    this.pre_select.push(p);
    console.log(this.pre_select);
    this.culminar();
  }
  culminar(){
    let alert=this.alertCtrl.create({
      title:'Confirmar',
      message:'¿Seguro que desea guardar los cambios?',
      buttons:[{
        text:'Si',
        handler:()=>{
          this.almacenarPerfil(); 
          this.mensaje();
        }

      },{
        text:'No',
        handler:()=>{
          let navTran=alert.dismiss();
              navTran.then(()=>{
                let loading = this.loadCtrl.create({
                  spinner: 'crescent',
                });
              
                loading.present();
              
                setTimeout(() => {
                  this.navCtrl.popTo(ActualizarPerfilPage); 
                }, 5000);
              
                setTimeout(() => {
                  loading.dismiss();
                }, 5000);
                
               
              });
            return false;
        }
      }],

    });
    alert.present();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  almacenarPerfil(){
    for (let i = 0; i < this.pre_select.length; i++) {
      this.clienteService.agregarPerfil(this.pre_select[i]).subscribe((res)=>{
        console.log(res);
      },(error)=>{
        console.log(error);
      })
    }
  }
  mensaje(){
    let alert = this.alertCtrl.create({
      title:'Aviso',
      message:'Tu perfil se actualizo correctamente',
      buttons:[
        {
          text:'Cerrar',
          handler:()=>{
            let navTran=alert.dismiss();
              navTran.then(()=>{
                let loading = this.loadCtrl.create({
                  spinner: 'crescent',
                });
              
                loading.present();
              
                setTimeout(() => {
                 //s this.clienteService.setPerfil();
                  this.navCtrl.popTo(PerfilPage); 
                }, 2000);
              
                setTimeout(() => {
                  loading.dismiss();
                }, 5000);
                
               
              });
            return false;
          }
        }],
    });
    alert.present();
  }
}
