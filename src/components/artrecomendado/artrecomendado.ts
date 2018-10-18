import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { ConsejoProvider } from '../../providers/consejo/consejo';
import { ClienteProvider } from '../../providers/cliente/cliente';

/**
 * Generated class for the ArtrecomendadoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'artrecomendado',
  templateUrl: 'artrecomendado.html'
})
export class ArtrecomendadoComponent {
  text: string;
  items:any[];
  auxiliar:any[];
  url_files:string;
  perfil:any[];
  tips:any[];
  constructor(public consejosService: ConsejoProvider,public authService:AuthProvider,public clienteService:ClienteProvider) {
    this.items=[];
    this.auxiliar=[];
    this.url_files=this.authService.ApiFile();
   this.tips=[];
    console.log('Hello ArtrecomendadoComponent Component');
    this.text = 'Hello World';
    this.perfil=[];
    this.getPerfil();
    this.consejo();
  }

 
  consejo(){
    this.consejosService.getConsejo().subscribe(
      (data)=>{
        this.items=data['data'];
        console.log(this.items)
        this.filtro();
        this.cargarAux();
      },(error)=>{
        console.log(error)
      });
    }
    cargarAux(){
      this.tips.reverse()
      if(this.tips.length<3){
        for (let i = 0; i < this.tips.length; i++) {
          this.auxiliar.push(this.tips[i]); 
        }  
      }else{
        for (let i = 0; i <3; i++) {
          this.auxiliar.push(this.tips[i]); 
        } 
      }
     
    }
  filtro(){
    this.auxiliar=[];
    for (let j = 0; j < this.items.length; j++) {
      this.consejos(this.items[j]);
     }
  }

  consejos(con){
    let consejo={
      detalle_consejo:[],
    };
    let cont=0;
    consejo.detalle_consejo=con.detalle_consejo;
    for (let i = 0; i < consejo.detalle_consejo.length; i++) {
      for (let j = 0; j < this.perfil.length; j++) {
        if (this.perfil[j].id_valor_parametro===consejo.detalle_consejo[i].id_valor_parametro) {
          cont++;
          }
        }
      }
     
      if(cont===consejo.detalle_consejo.length){
        this.tips.push(con);
      }else{
      }
    }
    getPerfil(){
      let i =0;
      i = Number(localStorage.getItem('id_cliente'));
      console.log(i);
      this.clienteService.getPerfilUser(i).subscribe((resp)=>{
        this.perfil=resp['data'].perfil;
       
      },(error)=>{
        console.log(error);
      })
    }

}
