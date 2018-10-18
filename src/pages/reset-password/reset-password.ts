import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ FormBuilder, Validators} from '@angular/forms';
import {FormGroup } from '@angular/forms/src/model';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  myForm:FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl:AlertController,
    public formBuilder: FormBuilder
  ){
    this.myForm=this.formBuilder.group({
      email:['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
