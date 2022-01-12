import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private readonly apiUrl = 'http://localhost:3000/v1/ftp';

  constructor(private readonly http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, file);
  }
}
