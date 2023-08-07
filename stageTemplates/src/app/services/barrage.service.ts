import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Barrage } from '../models/barrage'; // Import your Barrage model

@Injectable({
  providedIn: 'root'
})
export class BarrageService {

  private baseUrl = 'https://localhost:7109/api/APIBarrages';

  constructor(private http: HttpClient) { }

  getAllBarrages(): Observable<Barrage[]> {
    return this.http.get<Barrage[]>(`${this.baseUrl}`);
  }

  getBarrageById(id: number): Observable<Barrage> {
    return this.http.get<Barrage>(`${this.baseUrl}/${id}`);
  }

  createBarrage(barrage: Barrage): Observable<Barrage> {
    return this.http.post<Barrage>(`${this.baseUrl}`, barrage);
  }

  updateBarrage(barrage: Barrage): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${barrage.id}`, barrage);
  }

  deleteBarrage(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
