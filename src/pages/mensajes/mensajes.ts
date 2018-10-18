import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the MensajesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mensajes',
  templateUrl: 'mensajes.html',
})
export class MensajesPage {
  mensajes:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mensajes=[
      {titulo:"Eres importante", contenido:"Tu sugerencia ha sido tomada muy importante y estamos trabajando en ello "},
      {titulo:"Eres Bueno", contenido:"Gracias por darnos esa sugerencia tan util podrias ayudarnos a elevar nuestro prestigio"}
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MensajesPage');
  }
 



}
