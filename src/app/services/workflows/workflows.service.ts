import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkflowsService {
  private apiUrl = 'http://localhost:5000/api/v1/workflows';

  constructor(private readonly http: HttpClient) {}

  getWorkflowForms(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/forms`);
  }
}
