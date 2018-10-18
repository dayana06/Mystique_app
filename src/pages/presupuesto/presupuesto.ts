import { ServicioRProvider } from './../../providers/servicio-r/servicio-r';
import { EmpleadoProvider } from './../../providers/empleado/empleado';
import { PresupuestoProvider } from './../../providers/presupuesto/presupuesto';
import { SolicitudProvider } from './../../providers/solicitud/solicitud';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { RechazoComponent } from '../../components/rechazo/rechazo';
import { AgendaPage } from '../agenda/agenda';

/**
 * Generated class for the PresupuestoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-presupuesto',
  templateUrl: 'presupuesto.html',
})
export class PresupuestoPage {
  
  total:any;
  ser:any;
solicitud:{
  apellido:string,
cantidad_servicios:number,
empleado:any[],
estado:string
fecha_creacion:Date,
id:number,
id_cliente:number,
id_promocion:number,
nombre:string,
servicios_solicitados:any[],
sexo:string
};
presupuesto:{
  id:number,
  id_solicitud:number,
  monto_total:number,
  fecha_creacion:Date,
  estado:string
};
oren:{
  id_solicitud:number,
  empleados_asignados:number[];
}
empleaos:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl:LoadingController, 
    public dataSolicitud: SolicitudProvider,public modalCtrl: ModalController,
    public presuService:PresupuestoProvider,
  public empleadoService:EmpleadoProvider,
  public orenService:ServicioRProvider) {
    this.solicitud={
      apellido:'',
      cantidad_servicios:null,
      empleado:[],
      estado:'',
      fecha_creacion:null,
      id:null,
      id_cliente:null,
      id_promocion:null,
      nombre:'',
      servicios_solicitados:[],
      sexo:''
      };
    this.solicitud=this.navParams.data
    this.empleaos=[];
    this.presupuesto={
      id:null,
      id_solicitud:null,
      monto_total:null,
      fecha_creacion:null,
      estado:''
    };
    this.oren={
      id_solicitud:null,
      empleados_asignados:[]
    };
    this.oren.id_solicitud=this.solicitud.id;
    this.oren.empleados_asignados=this.solicitud.empleado;
  }

  ionViewDidLoad() {
    console.log(this.solicitud)
    console.log('ionViewDidLoad PresupuestoPage');
    this.cargarPresupuesto();
    this.cargarEmple();    
    this.solicitud.servicios_solicitados.reverse();
  }
  cargarPresupuesto(){
    this.presuService.getPresupuesto(this.solicitud.id).subscribe((ata)=>{
      this.presupuesto=ata['data'];
      console.log(this.presupuesto)
    },(error)=>{
      console.log(error);
    })
  } 
  cargarEmple(){
    for (let i = 0; i < this.solicitud.empleado.length; i++) {
      this.empleadoService.getEmpleado(this.solicitud.empleado[i]).subscribe((empe)=>{
        this.empleaos.push(empe['data']);
        console.log(this.empleaos)
      },(error)=>{
        console.log(error);
      })
    }
  }
  rechazar(){
    this.presuService.setPresu(this.presupuesto);
      let profileModal = this.modalCtrl.create(RechazoComponent);
      profileModal.present();
    }
  agendar(){
    this.presupuesto.estado='A',
    this.presuService.updatedPresupuesto(this.presupuesto).subscribe((pre)=>{
      console.log(pre);
      this.crearOrden();
     this.actualizarsolicitu();
    },(error)=>{
      console.log(error);
    });
    
  }
  crearOrden(){
    console.log(this.oren);
    this.orenService.newOrden(this.oren).subscribe((resp)=>{
      console.log(resp);
      this.Loading();
    },(error)=>{
      console.log(error);
    })
  }
  actualizarsolicitu(){
    this.solicitud.estado='A';
    this.dataSolicitud.updatedSolicitud(this.solicitud.id,this.solicitud).subscribe((resp)=>{
      console.log(resp);
    },(error)=>{
      console.log(error);
    })
  }
  Loading() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
    });
  
    loading.present();
  
    setTimeout(() => {
      let c= "nueva";
      this.navCtrl.push(AgendaPage,{soli:this.solicitud,origen:c});
    }, 3000);
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }
}
