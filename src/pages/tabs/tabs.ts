
import { HistorialPage } from './../historial/historial';
import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import { HomePage } from '../home/home';
import { ServicioPage } from '../servicio/servicio';
import { EmpresaPage } from '../empresa/empresa';


@IonicPage()
@Component({
 selector:'tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ServicioPage;
  tab3Root = HistorialPage;
  tab4Root = EmpresaPage;
 

  constructor() {

  }
 
}
