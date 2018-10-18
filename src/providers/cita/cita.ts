import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
const API_URL= "http://localhost:3000/api/"


/*
  Generated class for the CitaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CitaProvider {
  URL_cita="vista_orden_cita/"
  URL_citas= "cita"
  URL_orden= "orden_servicio"
  URL_empleado= "empleado"


  constructor(public http: HttpClient, public authService:AuthProvider) {
    console.log('Hello CitaProvider Provider');
  }

  getCitas(){
    return this.http.get(this.authService.ApiUrl()+this.URL_cita);
  }
  getCitaT(){
    return this.http.get(API_URL+this.URL_citas);
  }

  getEmpleado(){
    return this.http.get(API_URL+this.URL_empleado);
  }

  Aincidencia(id,inc){
    return this.http.put(API_URL+'orden_servicio/'+id,inc);
  }

  Acita(id,cit){
    return this.http.put(API_URL+'cita/'+id,cit);
  }
 IDBObjectStoreidid
}
