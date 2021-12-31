import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = 'http://localhost:5000/api/v1/forms';

  constructor(private readonly http: HttpClient) {}

  getForm(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  submitForm(id: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/submit`, data);
  }

  getPreviousForm(id: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/previous`, data);
  }

  getRegisterForm(): Observable<any> {
    return this.http.get(`${this.apiUrl}/register`);
  }

  getCurrentRegisterForm(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/register/users/${userId}`);
  }

  getCurrentRegisterFormValues(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/register/users/${userId}/values`);
  }
}
