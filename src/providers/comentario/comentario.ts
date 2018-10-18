import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
const API_URL=  "http://localhost:3000/api/"
/*
  Generated class for the ComentarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComentarioProvider {
  URL_comentario= "comentario"
  URL_tipoc= "tipo_comentario"
  URL_RSugerencia ="respuesta_comentario"
  URL_TRSugerencia = "tipo_respuesta_comentario"
  url_comen='vista_cliente_comentario';
  comentarios:{
    idC : number,
    tipo:number,
    contenido:string,
    estatus:string,
    fechaC:string,
  }
  constructor(public http: HttpClient,public auth:AuthProvider) {
   this.comentarios={
    idC : 0,
    tipo:0,
    contenido:"",
    estatus:"",
    fechaC: "",
    } 
    console.log('Hello ComentarioProvider Provider');
  }
  setValor(tipo){//,dir){
    this.comentarios.tipo=tipo;
    //this.comentarios.dirigido=dir;
  }
  getComent(){
    return this.comentarios;
  }
  
  Ncomentario(comentarios){
    console.log(API_URL+'comentario')
    return this.http.post(this.auth.ApiUrl()+'comentario',comentarios);
  }
  getComentario(i){
    return this.http.get(this.auth.ApiUrl()+'vista_cliente_comentario/'+i);
  }
  getTComentario(){
    return this.http.get(API_URL+this.URL_tipoc);
  }
  getResComentario(){
    return this.http.get(this.auth.ApiUrl()+'vista_respuesta_comentario');
  }
  getTRSugerencia(){
    return this.http.get(API_URL+this.URL_TRSugerencia);
  }
  ApiUrl(){
    return API_URL;
  }
}
