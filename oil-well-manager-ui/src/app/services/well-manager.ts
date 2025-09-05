import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Well } from '../models/Well';

@Injectable({
  providedIn: 'root',
})
export class WellManagerService {
  private baseUrl = 'http://localhost:3000/wells';

  constructor(private http: HttpClient) { }

  getAllWells(): Observable<Well[]> {
    return this.http.get<Well[]>(this.baseUrl);
  }

  createWell(well: { name: string, status: string }): Observable<Well> {
    return this.http.post<Well>(this.baseUrl, well);
  }

  updateWellStatus(id: number, status: string): Observable<Well> {
    return this.http.patch<Well>(`${this.baseUrl}/${id}`, { status });
  }

}
