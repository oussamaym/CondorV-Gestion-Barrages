import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalisationBarr } from '../models/localisationbarr';

@Injectable({
  providedIn: 'root'
})
export class LocalisationBarrService {

  private baseUrl = 'https://localhost:7109/api/APILocalisationBarrs'; 

  constructor(private http: HttpClient) { }

  
  getAllLocalisations(): Observable<LocalisationBarr[]> {
    return this.http.get<LocalisationBarr[]>(`${this.baseUrl}`);
  }

  
  getLocalisationById(id: number): Observable<LocalisationBarr> {
    return this.http.get<LocalisationBarr>(`${this.baseUrl}/${id}`);
  }


  createLocalisation(localisationbarr: LocalisationBarr): Observable<LocalisationBarr> {
    return this.http.post<LocalisationBarr>(`${this.baseUrl}`, localisationbarr);
  }

  
  updateLocalisation(localisationbarr: LocalisationBarr): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${localisationbarr.id}`, localisationbarr);
  }

  
  deleteLocalisation(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
