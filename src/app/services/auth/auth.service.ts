import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/v1/users';

  constructor(private readonly http: HttpClient) {}

  authenticate() {
    return this.http.get(`${this.apiUrl}/61d5c9d06064ac6c4d1e9b96`);
  }
}
