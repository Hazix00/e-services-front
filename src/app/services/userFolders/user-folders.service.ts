import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CreateFolderDto {
  workflowId: string;
  userId: string;
  title?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserFoldersService {
  private apiUrl = 'http://localhost:5000/api/v1/folders';

  constructor(private readonly http: HttpClient) {}

  getUserFoldersByWorkflowId(
    userId: string,
    workflowId: string
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${userId}/workflows/${workflowId}/all`
    );
  }

  createFolder(createFolderDto: CreateFolderDto): Observable<any> {
    return this.http.post(this.apiUrl, createFolderDto);
  }
}
