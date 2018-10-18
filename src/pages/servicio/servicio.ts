import { SolicitudesPage } from './../solicitudes/solicitudes';
import { SolicitudPage } from './../solicitud/solicitud';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, LoadingController } from 'ionic-angular';
import { ServiciosProvider } from '../../providers/servicios/servicios';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { ClienteProvider } from '../../providers/cliente/cliente';
/**
 * Generated class for the ServicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicio',
  templateUrl: 'servicio.html',
})
export class ServicioPage {
  searchTerm: string = '';
    servicios:any;
    searchControl: FormControl;
    searching: any = false;
    rate:any;
    servi:any[];
    errorMessage: string;
    url_file:string;
    servicios_mostrar:any[];
    perfil:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataSer: ServiciosProvider,
  public authService:AuthProvider,
  public loag:LoadingController,
  public clienteService:ClienteProvider) {

    this.searchControl = new FormControl();
    this.rate=0;
    this.url_file=this.authService.ApiFile();
    this.servicios_mostrar=[];
    this.perfil=[];
    this.getPerfil();
  }
  doRefresh(refresher: Refresher){
    this.dataSer.getServicios().subscribe((ser)=>{
      this.servi=ser['data'];
      console.log(this.servi);
      this.filtro();
      this.dataSer.reservarServicio(this.servicios_mostrar);
      this.servicios_mostrar=this.filterItems(this.searchTerm);
    },(error)=>{
      console.log(error);
    })
    setTimeout(() => {
      refresher.complete();
    }, 5000);
  }
  ionViewDidLoad() {
    this.getPerfil();
    this.getServis();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search  => {
      this.searching = false;
      this.getServis();
      });
   
    this.rate=4; 
  }
  onSearchInput(){
    this.searching = true;
   }
   getServis(){
     this.dataSer.getServicios().subscribe((ser)=>{
       this.servi=ser['data'];
       console.log(this.servi);
       this.filtro();
       this.servicios_mostrar=this.filterItems(this.searchTerm);
     },(error)=>{
       console.log(error);
     })
   }
   getPerfil(){
    let i = this.clienteService.getCliente().id;
    this.clienteService.getPerfilUser(i).subscribe((resp)=>{
      this.perfil=resp['data'].perfil;
      console.log(this.perfil);
    },(error)=>{
      console.log(error);
    })
  }
  //setFilteredItems(ser) {
   // this.servi = ser
   // }
    gotoSolicitud(){
      this.navCtrl.push(SolicitudPage)
    }
   
   filterItems(searchTerm){
      return this.servicios_mostrar.filter((item) => {
       return item.nombre.toLowerCase().
       indexOf(searchTerm.toLowerCase()) > -1;// ||
          //item.capital.toLowerCase().
          //indexOf(searchTerm.toLowerCase()) > -1;;
       });
      }
      filtro(){
        this.servicios_mostrar=[];
        for (let j = 0; j < this.servi.length; j++) {
          console.log('ahora va al siguiente'+j);
          this.servicio(this.servi[j]);
         }
      }
    
      servicio(ser){
        let servicio={
          detalle_servicio:[],
        };
        let cont=0;
        servicio.detalle_servicio=ser.detalle_servicio;
        for (let i = 0; i < servicio.detalle_servicio.length; i++) {
          for (let j = 0; j < this.perfil.length; j++) {
            if (this.perfil[j].id_valor_parametro===servicio.detalle_servicio[i].id_valor_parametro) {
              cont++;
              }
            }
          }
         
          if(cont===servicio.detalle_servicio.length){
            this.servicios_mostrar.push(ser);
          }else{
            console.log('no lo inserto');
          }
        }
        solicitar(item){
          let pro= 'servi'
          let loag = this.loag.create({
            spinner: 'crescent',
          });
        
          loag.present();
        
          setTimeout(() => {
            this.navCtrl.push(SolicitudPage,{item,pro});
          }, 1000);
        
          setTimeout(() => {
            loag.dismiss();
            }, 5000);
          }
      
}
