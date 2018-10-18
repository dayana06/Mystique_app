import { SolicitudesPage } from './../../pages/solicitudes/solicitudes';
import { NavController, LoadingController } from 'ionic-angular';
import { ClienteProvider } from './../../providers/cliente/cliente';
import { ServiciosProvider } from './../../providers/servicios/servicios';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { SolicitudPage } from '../../pages/solicitud/solicitud';

/**
 * Generated class for the ServrecomendadoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'servrecomendado',
  templateUrl: 'servrecomendado.html'
})
export class ServrecomendadoComponent {

  text: string;
  collection:any[];
  auxiliar:any[];
  url_file:string;
  perfil:any[];
  servicios_mostrar:any[];
    constructor(public auth:AuthProvider,
    public serService:ServiciosProvider,
    public clienteService: ClienteProvider,
    public navCrtl:NavController,
    public loag:LoadingController) {
      this.collection=[];
      //this.collection=this.serService.retornarServicios();
      this.auxiliar=[];
      this.perfil=[];
      this.servicios_mostrar=[];
      this.url_file=this.auth.ApiFile();
      this.getPerfil();
    console.log('Hello ServrecomendadoComponent Component');
    this.text = 'Hello World';
    this.getServis();
  }
  getServis(){
    this.serService.getServicios().subscribe((ser)=>{
      this.collection=ser['data'];
      console.log(this.collection);
      this.filtro();
      this.auxiliarSer();
    },(error)=>{
      console.log(error);
    })
  }
  auxiliarSer(){
    this.servicios_mostrar.reverse();
    for (let j = 0; j < 3; j++) {
      this.auxiliar.push(this.servicios_mostrar[j]);
    }
  }
  filtro(){
    this.servicios_mostrar=[];
    for (let j = 0; j < this.collection.length; j++) {
      this.servicio(this.collection[j]);
     }
  }

  servicio(ser){
    let servicio={
      detalle_servicio:[],
    };
    let cont=0;
    servicio.detalle_servicio=ser.detalle_servicio;
    for (let i = 0; i < servicio.detalle_servicio.length; i++) {
      for (let j = 0; j < this.perfil.length; j++) {
        if (this.perfil[j].id_valor_parametro===servicio.detalle_servicio[i].id_valor_parametro) {
          cont++;
          }
        }
      }
     
      if(cont===servicio.detalle_servicio.length){
        this.servicios_mostrar.push(ser);
      }
    }
    getPerfil(){
      let i =0;
      i = Number(localStorage.getItem('id_cliente'));
      console.log(i);
      this.clienteService.getPerfilUser(i).subscribe((resp)=>{
        this.perfil=resp['data'].perfil;
        },(error)=>{
        console.log(error);
      })
    }
  
}
