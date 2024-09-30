// src/app/services/database/dbsql.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbsqlService {
  private apiUrl = 'http://localhost:3000'; // Cambia esto si tu API está en otro puerto o dominio

  constructor(private http: HttpClient) {}

  // Métodos para usuarios (ya existentes)
  addUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  getUser(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/username/${username}`);
  }

  updateUser(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userData.id}`, userData);
  }

  addTimestamp(userId: number, timestampData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/timestamps/user/${userId}`, timestampData);
  }

  getTimestamps(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/timestamps/user/${userId}`);
  }
}
