import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the AgendaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgendaProvider {

  constructor(public http: HttpClient, public auth:AuthProvider) {
    console.log('Hello AgendaProvider Provider');
  }
getLaborables(){
  return this.http.get(this.auth.ApiUrl()+'/dia_laborable');
}
newCita(cita){
  return this.http.post(this.auth.ApiUrl()+'agregar_cita',cita);
}
getHorario(){
  return this.http.get(this.auth.ApiUrl()+'/horario');
}
}
