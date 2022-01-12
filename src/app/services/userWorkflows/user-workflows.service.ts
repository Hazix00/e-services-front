import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserWorkflowsService {
  private apiUrl = 'http://localhost:5000/api/v1/auth/users';

  constructor(private readonly http: HttpClient) {}

  getUserWorkflows(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/workflows`);
  }

  getWorkflows(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/workflows`);
  }
}
