import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  formLogin: FormGroup;
  loginError: boolean = false;
  loginSuccess: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    // Inicializa el formulario en el constructor
    this.formLogin = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login() {
    // Verificamos si el formulario es válido antes de proceder con el login
    if (this.formLogin.invalid) {
      // Marca todos los campos como "tocados" para activar las validaciones
      this.formLogin.markAllAsTouched();
      return;
    }

    const user = this.formLogin.get('user')?.value;
    const password = this.formLogin.get('password')?.value;

    this.isLoading = true;

    try {
      const loggedIn = await this.authService.login(user, password);

      this.isLoading = false;

      if (loggedIn) {
        this.loginSuccess = true; // Se actualiza loginSuccess en caso de éxito
        setTimeout(() => {
          this.navCtrl.navigateForward('/book-room'); // Navegamos a la siguiente página
        }, 1000);
      } else {
        this.loginError = true;
        this.loginSuccess = false; // Maneja loginSuccess adecuadamente aquí también
        console.log('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error during login:', error);
      this.isLoading = false;
      this.loginError = true;
      this.loginSuccess = false; // Asegúrate de manejar loginSuccess en caso de error
    }
  }

  navigateToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  goBack() {
    this.navCtrl.navigateBack('/home');
  }
}
