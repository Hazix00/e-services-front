import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private workflowApiUrl = 'http://localhost:5000/api/v1/auth/login';
  private apiUrl = 'http://localhost:3000/v1/auth/login';

  constructor(private readonly http: HttpClient) {}

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, {
      email,
      password,
    });
  }

  getLoginForm(): Observable<any> {
    return this.http.get(`${this.workflowApiUrl}`);
  }
}
