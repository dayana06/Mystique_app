import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_URL= "http://localhost:3000/api/"
/*
  Generated class for the CancelarCitaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CancelarCitaProvider {
URL_incidencia= "incidencia_orden"
URL_tipoin= "tipo_incidencia"
URL_razonin= "razon_incidencia"
incidencias:{
  id_orden_servicio:number,
  id_tipo_incidencia:number,
  descripcion:string,
}

  constructor(public http: HttpClient) {
    this.incidencias={
      id_orden_servicio : 0,
      id_tipo_incidencia : 0,
      descripcion : "",
    }
    console.log('Hello CancelarCitaProvider Provider');
  }

  Gincidencia(incidencias){
    console.log(API_URL+'incidencia_orden')
    return this.http.post(API_URL+'incidencia_orden',incidencias);
  }

  getTipoI(){
    return this.http.get(API_URL+this.URL_tipoin);
  }

  getRazonI(){
    return this.http.get(API_URL+this.URL_razonin);
  }
}
