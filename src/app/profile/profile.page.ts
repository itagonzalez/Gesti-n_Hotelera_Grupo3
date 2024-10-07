import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DbsqlService } from '../services/dbsql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {};
  editMode: boolean = false;

  constructor(private router: Router, private dbsqlService: DbsqlService) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const user = localStorage.getItem('user');
    if (user) {
      this.dbsqlService.getUser(user).subscribe(
        (data) => {
          this.user = data;
          console.log('Datos del usuario cargados:', this.user); // Verifica los datos en la consola
        },
        (error) => {
          console.error('Error loading user data:', error);
        }
      );
    }
  }
  

  enableEdit() {
    this.editMode = true;
  }

  saveChanges() {
    this.dbsqlService.updateUser(this.user).subscribe(
      (response) => {
        this.editMode = false;
        console.log('Cambios guardados correctamente.');
      },
      (error) => {
        console.error('Error saving user data:', error);
      }
    );
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}