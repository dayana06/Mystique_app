import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the NotificacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificacion',
  templateUrl: 'notificacion.html',
})
export class NotificacionPage {
  mensajes:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
   
    this.mensajes=this.navParams.data;
    console.log(this.mensajes);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionPage');
  }
  reviso(item){
    this.mensajes.splice(item,1);
     this.viewCtrl.dismiss();
  }
}
