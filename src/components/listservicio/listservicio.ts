import { Component } from '@angular/core';

/**
 * Generated class for the ListservicioComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'listservicio',
  templateUrl: 'listservicio.html'
})
export class ListservicioComponent {

  text: string;

  constructor() {
    console.log('Hello ListservicioComponent Component');
    this.text = 'Hello World';
  }

}
