import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ AuthProvider} from './../auth/auth' 
/*
  Generated class for the TiposProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TiposProvider {
	categoria_servicio:any;
  constructor(public http: HttpClient,private auth: AuthProvider) {
    console.log('Hello TiposProvider Provider');
  }

  getCategorias_ser(){
  	return this.http.get(this.auth.ApiUrl()+'categoria_servicio')
  }
  getTipos_parametro(){
  	return this.http.get(this.auth.ApiUrl()+'tipo_parametro')
  }
  getParametros(){
  	return this.http.get(this.auth.ApiUrl()+'parametro')
  }
  getTiposServicios(){
   return this.http.get(this.auth.ApiUrl()+'tipo_servicio/')
   }
   getValorParametro(){
     return this.http.get(this.auth.ApiUrl()+'valor_parametro')
   }
   getEspeciali(){
     return this.http.get(this.auth.ApiUrl()+'especialidad')
   }
   getTipo_respuesta_presupuesto(){
     return this.http.get(this.auth.ApiUrl()+'tipo_respuesta_presupuesto');
   }
   CrearRespuesta_presupuesto(res){
     return this.http.post(this.auth.ApiUrl()+'respuesta_presupuesto',res);
   }
   getTipo_respuesta_solicitud(){
     return this.http.get(this.auth.ApiUrl()+'tipo_respuesta_solicitud');
   }

}
