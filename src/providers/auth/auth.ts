import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const port = '3000';
const API_URL = 'http://localhost:'+port+'/api/';
const IMG_URL = 'http://localhost:'+port+'/files/';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  user:any;
  url_login : 'signin/';
  perfil:any;
  token:any;
  id_user_token:any;
  
  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }
  login(cred){
    console.log(API_URL+'signin')
    return this.http.post(API_URL+'signin',cred);
  }
  ApiUrl(){
    return API_URL;
  }
  ApiFile(){
    return IMG_URL;
  }
}










