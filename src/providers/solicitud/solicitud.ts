import { AuthProvider } from './../auth/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SolicitudProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SolicitudProvider {
  solicitudes:any

  constructor(public http: HttpClient, public authService: AuthProvider) {
    console.log('Hello SolicitudProvider Provider');

  }
  getSolicitud(id_cliente){
    return this.http.get(this.authService.ApiUrl()+'vista_cliente_solicitud/'+id_cliente);
  }
   saveSolicitud(sol){
     return this.http.post(this.authService.ApiUrl()+'agregar_solicitud',sol)
   }
   respuestasolicitud(i){
     return this.http.get(this.authService.ApiUrl()+'respuesta_solicitud_foraneo/'+i);
   }
   updatedSolicitud(i,solicitu){
     return this.http.put(this.authService.ApiUrl()+'solicitud/'+i,solicitu);
   }
}
