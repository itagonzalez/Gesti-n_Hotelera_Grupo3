import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.page.html',
  styleUrls: ['./book-room.page.scss'],
})
export class BookRoomPage {
  formBooking: FormGroup;
  isLoading: boolean = false;
  totalPrice: number = 0;
  minDateCheckIn: string;
  minDateCheckOut: string;
  selectedCheckIn: Date;
  selectedCheckOut: Date;

  constructor(private fb: FormBuilder, private navCtrl: NavController) {
    // Inicializa las fechas actuales
    const currentDate = new Date();
    this.selectedCheckIn = currentDate;
    this.selectedCheckOut = currentDate;

    // Formato de fecha para el input type="date"
    this.minDateCheckIn = currentDate.toISOString().split('T')[0]; // Fecha mínima de entrada
    this.minDateCheckOut = currentDate.toISOString().split('T')[0]; // Fecha mínima de salida

    this.formBooking = this.fb.group({
      checkInDate: [this.minDateCheckIn, Validators.required],
      checkOutDate: [this.minDateCheckOut, Validators.required],
      guests: [1, Validators.required],
      roomType: ['single', Validators.required],
      breakfast: [false],
      transport: [false],
    });

    // Calcula el precio cada vez que los campos cambian
    this.formBooking.valueChanges.subscribe(() => this.calculateTotalPrice());
  }

  calculateTotalPrice() {
    let basePrice = 100; // Precio base de la habitación

    const roomType = this.formBooking.get('roomType')?.value;
    const guests = this.formBooking.get('guests')?.value;
    const breakfast = this.formBooking.get('breakfast')?.value;
    const transport = this.formBooking.get('transport')?.value;

    switch (roomType) {
      case 'double':
        basePrice += 50;
        break;
      case 'suite':
        basePrice += 100;
        break;
    }

    if (breakfast) {
      basePrice += 20;
    }

    if (transport) {
      basePrice += 30;
    }

    // Multiplica el precio por el número de huéspedes
    this.totalPrice = basePrice * guests;
  }

  confirmBooking() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.navCtrl.navigateForward('/reservations');
    }, 2000);
  }

  goBack() {
    this.navCtrl.back();
  }

  // Método para actualizar la fecha de entrada
  updateCheckInDate(value: string | null) {
    if (value) {
      this.selectedCheckIn = new Date(value); // Convertimos el string a Date
      this.formBooking.patchValue({ checkInDate: value });
    }
  }

  // Método para actualizar la fecha de salida
  updateCheckOutDate(value: string | null) {
    if (value) {
      this.selectedCheckOut = new Date(value); // Convertimos el string a Date
      this.formBooking.patchValue({ checkOutDate: value });
    }
  }
}
