import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:5000/api/v1/auth/register';

  constructor(private readonly http: HttpClient) {}

  getRegisterForm(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getCurrentRegisterForm(clientID: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${clientID}`);
  }

  submitregisterForm(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  getPreviousRegisterForm(userId: any, formId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}/previous/${formId}`);
  }
}
