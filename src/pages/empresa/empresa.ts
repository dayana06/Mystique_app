import { Component } from '@angular/core';
import { ModalController} from 'ionic-angular';


@Component({
  selector: 'page-empresa',
  templateUrl: 'empresa.html'
})
export class EmpresaPage {
  constructor(public modalCtrl: ModalController) {}

  openModal(characterNum) {

   // let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    //modal.present();
  }
}


