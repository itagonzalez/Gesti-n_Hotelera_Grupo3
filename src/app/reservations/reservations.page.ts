import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  reservationDetails: any;

  constructor(private navCtrl: NavController, private route: ActivatedRoute) { }

  ngOnInit() {
    // Obtiene los detalles de la reserva pasados como parámetros de consulta
    this.route.queryParams.subscribe(params => {
      if (params['reservationDetails']) {
        this.reservationDetails = JSON.parse(params['reservationDetails']);
      }
    });
  }

  cancelReservation() {
    // Limpia los detalles de la reserva
    this.reservationDetails = null;

    // Redirige al usuario a la página de reservar
    this.navCtrl.navigateBack('/book-room');
  }

  logOut() {
    localStorage.clear();
    this.navCtrl.navigateRoot('/login');
  }
}
