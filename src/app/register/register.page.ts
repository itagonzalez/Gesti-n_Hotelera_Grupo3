import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DbsqlService } from 'src/app/services/dbsql.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  formRegister: FormGroup;
  success: boolean = false;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private dbService: DbsqlService
  ) {
    this.formRegister = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8), Validators.pattern('^[a-zA-Z0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      dateBirth: ['', Validators.required]
    });
  }

  register() {
    if (this.formRegister.valid) {
      const user = this.formRegister.get('user')?.value;
      const password = this.formRegister.get('password')?.value;
      const email = this.formRegister.get('email')?.value;
      const address = this.formRegister.get('address')?.value;
      const name = this.formRegister.get('name')?.value;
      const lastName = this.formRegister.get('lastName')?.value;
      const companyName = this.formRegister.get('companyName')?.value;
      const dateBirth = this.formRegister.get('dateBirth')?.value;

      // Crear un objeto usuario con los datos del formulario
      const userData = { user, password, email, address, name, lastName, companyName, dateBirth };

      this.dbService.addUser(userData).subscribe(
        (response) => {
          console.log('Usuario registrado:', response);

          // Indicar que el registro fue exitoso
          this.success = true;

          // Redirigir al login después de un breve tiempo
          setTimeout(() => {
            this.navCtrl.navigateBack(['/login']);
          }, 2000); // Redirige después de 2 segundos (2000 ms)
        },
        (error) => {
          console.log('Error al registrar el usuario:', error);
        }
      );
    } else {
      console.log('Formulario de registro inválido');
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}
