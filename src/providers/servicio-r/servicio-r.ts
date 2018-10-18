import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
/*
  Generated class for the ServicioRProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicioRProvider {
  URL_serviciosr="vista_cliente_orden/"

  constructor(public http: HttpClient,public authService:AuthProvider) {
    
  }

getServiciosR(id){
  console.log(id);
  return this.http.get(this.authService.ApiUrl()+this.URL_serviciosr+id);
}
newOrden(oren){
  return this.http.post(this.authService.ApiUrl()+'agregar_orden',oren)
}
updatedOrden(orden){
  return this.http.put(this.authService.ApiUrl()+'orden_servicio',orden)
}
getOrdenes()
{
  return this.http.get(this.authService.ApiUrl()+'orden_servicio');
}
}
