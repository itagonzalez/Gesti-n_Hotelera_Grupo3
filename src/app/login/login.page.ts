import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service'; // Asegúrate de importar el servicio correctamente

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user: string = '';
  password: string = '';
  errorMessage: string = ''; // Mensaje de error en caso de login fallido

  constructor(private navCtrl: NavController, private authService: AuthService) {}

  // Función de login
  async login() {
    if (!this.user || !this.password) {
      this.errorMessage = 'Por favor, ingresa todos los campos.';
      return;
    }

    try {
      const success = await this.authService.login(this.user, this.password);

      if (success) {
        this.navCtrl.navigateForward('/book'); // Navegar si el login es exitoso
      } else {
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      }
    } catch (error) {
      this.errorMessage = 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo más tarde.';
      console.error('Error en login:', error);
    }
  }

  goBack() {
    this.navCtrl.back(); // Navega hacia atrás
  }
}
