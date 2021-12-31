import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly apiUrl = 'http://localhost:5000/api/v1/categories';

  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
