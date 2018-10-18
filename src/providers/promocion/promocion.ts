import { AuthProvider } from './../auth/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PromocionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromocionProvider {
  URL_promocion='vista_todas_promociones';
  promociones:any[];
  constructor(public http: HttpClient, public authPro: AuthProvider) {
    this.promociones=[];
  }
  getPromocion(){
  return this.http.get(this.authPro.ApiUrl()+this.URL_promocion);
}
 reservarPromos(promos){
  this.promociones=promos;
  console.log(this.promociones);
 }
 retornarPromos(){
   return this.promociones;
 }
}
