import { Socket } from 'ng-socket-io';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ComentarioProvider } from './../../providers/comentario/comentario';
import { EmpleadosPage } from './../empleados/empleados';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiciosPage } from '../servicios/servicios';
import { ClienteProvider } from './../../providers/cliente/cliente';

//import{ConsejoProvider} from '../../providers/consejo/consejo';

/**
 * Generated class for the ComentarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comentar',
  templateUrl: 'comentar.html',
})
export class ComentarPage {
tcomentarios:any;
visibleE: Boolean=false;
visibleS: Boolean=false;
visibleEm: Boolean=false;
ver:Boolean=true;
 direccion:string="";
tipos:string = "";
item:any;
dir:any;
comen:{

  id_cliente : number,
  id_tipo_comentario:number,
  descripcion:string,
  
}

coment:any
cliente:any
text:Boolean=false;
text2:Boolean=false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     public comenProvider: ComentarioProvider,  
     public cliProvider: ClienteProvider,
      public alertCtrl:AlertController,
     public socket:Socket) {
  this.tcomentario();
  console.log(this.tcomentarios)
  console.log(this.direccion);
  this.comen={
    id_cliente: this.cliProvider.getCliente().id,
    id_tipo_comentario: 0,
    descripcion: "",
    
  };
//this.comen.id_cliente=1;
//this.comen.id_tipo_comentario=1;
  this.coment=this.comenProvider.getComent();
  }


  tcomentario(){
    this.comenProvider.getTComentario().subscribe(
      (data)=>{
        this.tcomentarios=data['data'];
        console.log(this.tcomentarios)
      },(error)=>{console.log(error)}
      
    );
  
  }

  ionViewDidLoad() {
    this.direccion=this.coment.dirigido;
    this.tcomentario();
    console.log(this.tcomentarios);
  }
  ionViewWillEnter(){
    this.coment=this.comenProvider.getComent();
    
  } 
  cambiar(){
  	 if(this.direccion === 'e'){
      this.visibleE=true;
      this.visibleS=false;
      this.comenProvider.setValor(this.tipos);//,this.direccion);
      
		 }else{
       if(this.direccion === 's'){
        this.comenProvider.setValor(this.tipos);//,this.direccion);
        this.visibleE=false;
       this.visibleS=true;     
       }else{
         if(this.direccion === 'em'){
          this.comenProvider.setValor(this.tipos);//,this.direccion);
           this.visibleEm=true;
           this.visibleE=false;
           this.visibleS=false; 
         }
       }
    }
     console.log(this.direccion);
     console.log(this.navParams.data);
  }
 
  guardar(){
    console.log(this.comen);
   this.comenProvider.Ncomentario(this.comen).subscribe((data)=>{
     this.notificar();
     console.log(data);
   },(error)=>{
     console.log(error);
   })
    let alert = this.alertCtrl.create({
        title: 'Hola!!',
        subTitle: 'Gracias por tu Comentario, Lo estaremos atendiendo',
        buttons: [{
          text:'Cerrar',
        handler:()=>{
          let navTran=alert.dismiss();
            navTran.then(()=>{
              this.navCtrl.popToRoot();
            });
          return false;
        }
        }],
      });
      alert.present()
    }
    notificar(){
      this.socket.emit('nuevo_comentario',{
        titulo: 'Nuevo comentario',
        mensaje: this.cliProvider.getCliente().nombre+' '+this.cliProvider.getCliente().apellido+ 'ha hecho un comentario',
        fecha: new Date()
        });
    }


 }
  

