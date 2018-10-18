import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthProvider} from '../../providers/auth/auth';

/*
  Generated class for the ServiciosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiciosProvider {
  
  servs:Array<
  {id:number,
   imagen:string,
   id_tipo_servicio:number,
   nombre:string,
   precio:number,
   descripcion:string,
   duracion:number,
   status:string,
   visible:boolean,
   destalle_servicio:any[];
   select:boolean}>;

  constructor(public http: HttpClient,public auth : AuthProvider) {
   
    this.servs=[
  {id:null,
   imagen:'',
   id_tipo_servicio:0,
   nombre:'',
   precio:0,
   descripcion:'',
   duracion:0,
   status:'',
   visible:false,
   destalle_servicio:[],
   select:false}
   ];
    console.log('Hello ServiciosProvider Provider');
 
  }
  getServicios(){
    return this.http.get(this.auth.ApiUrl()+'vista_todos_servicios');
  }
  getServicio(id){
    return this.http.get(this.auth.ApiUrl()+'servicio/'+id)
  }
  getServiciosconCategoria(){
    return this.http.get(this.auth.ApiUrl()+'vista_servicio_categoria')
  } 
  reservarServicio(ser){
    this.servs=ser;
  }
  retornarServicios(){
    return this.servs;
  }
}
