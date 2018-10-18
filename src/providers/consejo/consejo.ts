import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the ConsejoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConsejoProvider {
URL_consejo= "vista_todos_consejos";
consejos:any[];
  constructor(public http: HttpClient,public authService:AuthProvider) {
    
  }

getConsejo(){
  return this.http.get(this.authService.ApiUrl()+this.URL_consejo);
}
reservarConsejos(consejos){
  this.consejos=consejos

  }
  retornarConsejos(){
    return this.consejos;
  }
}
