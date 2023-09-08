import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mesure } from '../models/mesure';

@Injectable({
  providedIn: 'root'
})
export class MesureService {

  private baseUrl = 'https://localhost:7109/api/APIMesures'; 

  constructor(private http: HttpClient) { }

  getAllMesures(): Observable<Mesure[]> {
    return this.http.get<Mesure[]>(`${this.baseUrl}`);
  }

  
  getMesureById(id: number): Observable<Mesure> {
    return this.http.get<Mesure>(`${this.baseUrl}/${id}`);
  }

  createMesure(mesure: Mesure): Observable<Mesure> {
    return this.http.post<Mesure>(`${this.baseUrl}`, mesure);
  }

  updateMesure(mesure: Mesure): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${mesure.id}`, mesure);
  }

  deleteMesure(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
