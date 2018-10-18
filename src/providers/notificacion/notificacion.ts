import { AuthProvider } from './../auth/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NotificacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificacionProvider {
i:number;
  constructor(public http: HttpClient,
    public auth:AuthProvider) {
      this.i=Number(localStorage.getItem('id_usuario'));
    console.log('Hello NotificacionProvider Provider');
  }
  getNotificaciones(){
    return this.http.get(this.auth.ApiUrl()+this.i);
  }

}
