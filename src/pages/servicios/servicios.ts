import { ServiciosProvider } from './../../providers/servicios/servicios';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComentarioProvider } from '../../providers/comentario/comentario';

/**
 * Generated class for the ServiciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicios',
  templateUrl: 'servicios.html',
})
export class ServiciosPage {
  serv:any
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public dataSer: ServiciosProvider) {
    this.serv=this.dataSer.getServicios();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiciosPage');
  }

}
