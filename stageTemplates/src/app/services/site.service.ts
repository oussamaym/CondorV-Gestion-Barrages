import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from '../models/site'; // Import your Barrage model

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private baseUrl = 'https://localhost:7109/api/APISites';

  constructor(private http: HttpClient) { }

  getAllBarrages(): Observable<Site[]> {
    return this.http.get<Site[]>(`${this.baseUrl}`);
  }
  

  getBarrageById(id: number): Observable<Site> {
    return this.http.get<Site>(`${this.baseUrl}/${id}`);
  }

  createBarrage(site: Site): Observable<Site> {
    return this.http.post<Site>(`${this.baseUrl}`, site);
  }

  updateBarrage(site: Site): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${site.id}`, site);
  }

  deleteBarrage(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
