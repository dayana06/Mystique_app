import { Component } from '@angular/core';
import { ClienteProvider} from '../../providers/cliente/cliente';
import { ModalController, NavParams, NavController, LoadingController } from 'ionic-angular';
import  {TiposProvider} from '../../providers/tipos/tipos';
import { ActualizarPerfilPage } from '../actualizar-perfil/actualizar-perfil';


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
	user:any
  perfilgustos:any[];
  perfilcaracteristicas:any[];
  perfilbasico:any[];
  parametros:any;
  tipo_parametro:any;
  valor_parametros:any[];
  perfil:any[];
  sexo:string;
  clie:number;
  constructor(
  	public modalCtrl: ModalController,
  	public navCtrl: NavController, 
  	public navParams:NavParams,
  	private clienteService:  ClienteProvider,
    private tipoService: TiposProvider,
    private loadCtrl:LoadingController) {
      this.sexo='';
    this.clie=this.clienteService.getCliente().id;
  	this.user=this.clienteService.getCliente();
    this.perfil=[];
    this.getPerfil();
    console.log(this.user);
  }
  ionViewDidLoad(){
    this.getPerfil();
    this.perfilbasico=[];
    this.perfilcaracteristicas=[];
    this.perfilgustos=[];
       
  }

  getPerfil(){
    this.clienteService.getPerfilUser(this.clie).subscribe((resp)=>{
      this.perfil=resp['data'].perfil;
      console.log(this.perfil);
      this.clasificarParametros();
    this.determinarSexo();
 
    },(error)=>{
      console.log(error);
    })
  }
  clasificarParametros(){
    this.perfilbasico=[];
    this.perfilcaracteristicas=[];
    this.perfilgustos=[];
    for (let i = 0; i < this.perfil.length; i++) {
        if(this.perfil[i].clasificacion === 'DB'){
          this.perfilbasico.push(this.perfil[i])
        }else{
          if(this.perfil[i].clasificacion === 'CA'){
            this.perfilcaracteristicas.push(this.perfil[i]);
          }else{
            if(this.perfil[i].clasificacion === 'GP'){
              this.perfilgustos.push(this.perfil[i])
            }
          }
        }
      
    }
    console.log(this.perfilbasico);
    console.log(this.perfilcaracteristicas);
    console.log(this.perfilgustos);
  }
  determinarSexo(){
    for (let i = 0; i < this.perfilbasico.length; i++) {
      if(this.perfilbasico[i].valor=='Mujer'||this.perfilbasico[i].valor=='mujer'){
        this.sexo='Mujer';
      }else{
        if(this.perfilbasico[i].valor=='Hombre'||this.perfilbasico[i].valor=='hombre'){
          this.sexo='Hombre';
        }
      }
    }
    console.log(this.sexo);
  }
  actualizar(){
    let loading = this.loadCtrl.create({
      spinner: 'crescent',
    });
  
    loading.present();
  
    setTimeout(() => {
      this.navCtrl.push(ActualizarPerfilPage,this.perfilgustos); 
    }, 1000);
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
    
  }
}


