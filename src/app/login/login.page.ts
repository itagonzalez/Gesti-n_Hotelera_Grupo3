import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private navCtrl: NavController) { }

  goToRegister() {
    this.navCtrl.navigateForward('/register'); // Navega a la página de registro
  }

  goBack() {
    this.navCtrl.back(); // Navega hacia atrás
  }
}
