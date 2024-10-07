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
  totalPrice: number = 0; // Costo total
  minDateCheckIn: string;
  minDateCheckOut: string;
  selectedCheckIn: Date;
  selectedCheckOut: Date;

  // Precios para cada tipo de habitación y servicio adicional
  private readonly ROOM_PRICES: { [key: string]: number } = {
    single: 35990, // Precio base por noche para habitación individual
    double: 59990, // Precio base por noche para habitación doble
    suite: 79990,  // Precio base por noche para suite
  };
  private readonly BREAKFAST_PRICE =5990; // Precio por desayuno
  private readonly TRANSPORT_PRICE = 9990; // Precio por transporte

  constructor(private fb: FormBuilder, private navCtrl: NavController) {
    const currentDate = new Date();
    this.selectedCheckIn = currentDate;
    this.selectedCheckOut = currentDate;

    this.minDateCheckIn = currentDate.toISOString().split('T')[0];
    this.minDateCheckOut = currentDate.toISOString().split('T')[0];

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
    let basePrice = this.ROOM_PRICES[this.formBooking.get('roomType')?.value as keyof typeof this.ROOM_PRICES] || 0; // Precio base por noche
    let totalNights = 1; // Mínimo 1 noche

    const guests = this.formBooking.get('guests')?.value;
    const breakfast = this.formBooking.get('breakfast')?.value;
    const transport = this.formBooking.get('transport')?.value;

    if (this.selectedCheckIn && this.selectedCheckOut) {
      const diffTime = Math.abs(this.selectedCheckOut.getTime() - this.selectedCheckIn.getTime());
      totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // Suma los precios de los servicios adicionales
    let additionalCosts = 0;
    if (breakfast) {
      additionalCosts += this.BREAKFAST_PRICE;
    }
    if (transport) {
      additionalCosts += this.TRANSPORT_PRICE;
    }

    // Calcula el precio total
    this.totalPrice = (basePrice + additionalCosts) * guests * totalNights;
  }

  confirmBooking() {
    this.isLoading = true;

    // Prepara los detalles de la reserva
    const reservationDetails = {
        checkInDate: this.formBooking.get('checkInDate')?.value,
        checkOutDate: this.formBooking.get('checkOutDate')?.value,
        guests: this.formBooking.get('guests')?.value,
        roomType: this.formBooking.get('roomType')?.value,
        breakfast: this.formBooking.get('breakfast')?.value,
        transport: this.formBooking.get('transport')?.value,
        totalPrice: this.totalPrice // Costo total
    };

    // Simulamos un retraso para la reserva
    setTimeout(() => {
        // Aquí se hace la lógica de reserva si es necesario

        // Navega a la página de reservas
        this.navCtrl.navigateForward('/reservations', {
            queryParams: { reservationDetails: JSON.stringify(reservationDetails) } // Pasar detalles de la reserva
        });

        // Cambia el estado de isLoading después de navegar
        this.isLoading = false;
    }, 2000); // El tiempo puede ajustarse según lo que necesites
}

  
  

  goBack() {
    this.navCtrl.back();
  }

  updateCheckInDate(value: string | null) {
    if (value) {
      this.selectedCheckIn = new Date(value);
      this.formBooking.patchValue({ checkInDate: value });
    }
  }

  updateCheckOutDate(value: string | null) {
    if (value) {
      this.selectedCheckOut = new Date(value);
      this.formBooking.patchValue({ checkOutDate: value });
    }
  }

  logOut() {
    localStorage.clear();
    this.navCtrl.navigateRoot('/login');
  }
}
