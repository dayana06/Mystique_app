import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';

const port = '3000';
const API_URL = 'http://localhost:'+port+'/api/';

/*
  Generated class for the CalificarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CalificarProvider {
  url_calificar : '/gestion_calificacion';
  url_criterio:'/criterio';
  
  constructor(public http: HttpClient,public authService:AuthProvider) {
    console.log('Hello CalificarProvider Provider');
    }

    getCriterio(){
      return this.http.get(this.authService.ApiUrl()+'criterio');
    }

    Calificacion(calificar){
      console.log(API_URL+'gestion_calificacion')
      return this.http.post(API_URL+'gestion_calificacion',calificar);
    }

    ActOden(id,orden){
      return this.http.put(API_URL+'orden_servicio/'+id,orden);
    }

    ApiUrl(){
      return API_URL;
    }
  }

