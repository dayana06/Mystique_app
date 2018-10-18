import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ServicioRProvider} from '../servicio-r/servicio-r';
import {AuthProvider} from '../auth/auth';
const API_URL= "http://localhost:3000/api/" 

/*
  Generated class for the ReclamoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReclamoProvider {
URL_respuestar= "respuesta_reclamo"
  constructor(public http: HttpClient,public auth:AuthProvider) {
    console.log('Hello ReclamoProvider Provider');
  }

  getRespuesta(){
    return this.http.get(this.auth.ApiUrl()+this.URL_respuestar);
  }
  getTipo_reclamo(){
  	return this.http.get(this.auth.ApiUrl()+'tipo_reclamo');
  }
  ActOden(i,orn){
    return this.http.put(this.auth.ApiUrl()+'orden_servicio/'+i,orn);
  }
  DescripcionReclamo(rcamo){
    return this.http.post(this.auth.ApiUrl()+'reclamo',rcamo);
  }
  getReclamos(){ 
    return this.http.get(this.auth.ApiUrl()+'reclamo');
  }
  getDetalle_servicio(){
    return this.http.get(this.auth.ApiUrl()+'detalle_servicio');
}
getServicioSolicitados(id){
  return this.http.get(this.auth.ApiUrl()+'servicio_solicitado/'+id);
  }
}
