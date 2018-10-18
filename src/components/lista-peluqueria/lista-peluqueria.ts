import { Component } from '@angular/core';

/**
 * Generated class for the ListaPeluqueriaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lista-peluqueria',
  templateUrl: 'lista-peluqueria.html'
})
export class ListaPeluqueriaComponent {

  text: string;

  constructor() {
    console.log('Hello ListaPeluqueriaComponent Component');
    this.text = 'Hello World';
  }

}
