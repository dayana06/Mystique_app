import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the PresupuestoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PresupuestoProvider {
presupuesto:any;
  constructor(public http: HttpClient, public authService: AuthProvider) {
    console.log('Hello PresupuestoProvider Provider');
  }
 getPresupuesto(key){
   return this.http.get(this.authService.ApiUrl()+'solicitud_presupuesto/'+key);
 }
 updatedPresupuesto(presu){
   console.log(presu);
   return this.http.put(this.authService.ApiUrl()+'presupuesto/'+presu.id,presu)
 }
 newRespuestaPresu(presu_respuesta){
  return this.http.post(this.authService.ApiUrl()+'respuesta_presupuesto',presu_respuesta)
 }
 tiporespuestaPresupuesto(){
   return this.http.get(this.authService.ApiUrl()+'tipo_respuesta_presupuesto');
 }
 setPresu(pre){
   this.presupuesto=pre;
 }
 getPresu(){
   return this.presupuesto;
 }
}
