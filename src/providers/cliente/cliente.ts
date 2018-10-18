import { AuthProvider } from './../auth/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const  url_cliente = 'usuario/cliente/'

/*
  Generated class for the ClienteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClienteProvider {
 
  url_perfil:string = 'perfil/'
  perfil:any[];
  sexo:string;
  correo_cliente:string;
  cliente:{
    id:number,
    nombre:string,
    apellido:string,
    cedula:string,
    telefono:string,
    direccion:string,
    id_ciudad:number,
    fecha_nacimiento:string,
    tipo_cliente:string,
    id_usuario:number,
    estatus:string,
    auth:Boolean,
    correo:string
  }
  constructor(public http: HttpClient, public authService:AuthProvider) {
    this.cliente={
      id:null,
      nombre:'',
      apellido:'',
      cedula:'',
      telefono:'',
      direccion:'',
      id_ciudad:0,
      fecha_nacimiento:'',
      tipo_cliente:'',
      id_usuario:null,
      estatus:'',
      auth:false,
      correo:'',
      
    }
    this.sexo='';
    
  }
 
  getUser(id){
    return this.http.get(this.authService.ApiUrl()+url_cliente+id)
  }
  setCliente(user){
    this.cliente=user;
    this.cliente.correo=this.correo_cliente;
    localStorage.setItem('id_cliente',String(this.cliente.id));
  }
  setClienteAuth(){
    this.cliente.auth=true;
  }
  getCliente(){
    return this.cliente;
  }
  getPerfilUser(i){
    return this.http.get(this.authService.ApiUrl()+'vista_cliente_perfil/'+i)
  }
  //setPerfil(){
   //   this.getPerfilUser().subscribe(
    //    (data)=>{
    //     this.perfil=data['data'].perfil
    //     console.log(this.perfil);
    //    },(error)=>{
    //    console.log(error);
   //     }
   //   )
  //  }
    getPerfil(){
      return this.perfil;
    }
    setCorreo(correo){
      console.log(correo);
      this.correo_cliente=correo;
    }
    
    setSexoCliente(sexo){
      this.sexo=sexo
    }
    getSexoCliente(){
      return this.sexo;
    }
    actualizarPerfil(perfil){
      console.log(perfil);
      return this.http.put(this.authService.ApiUrl()+'perfil/'+ perfil.id_perfil,perfil);
    }
    agregarPerfil(perfil){
      return this.http.post(this.authService.ApiUrl()+'perfil',perfil);
    }
    actualizarTipoCliente(i,cliente){
      return this.http.put(this.authService.ApiUrl()+'cliente/'+i,cliente);
    }
}
