import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grandeur } from '../models/grandeur';


@Injectable({
  providedIn: 'root'
})
export class GrandeurService {

  private baseUrl = 'https://localhost:7109/api/APIGrandeurs'; 

  constructor(private http: HttpClient) { }

  
  getAllGrandeurs(): Observable<Grandeur[]> {
    return this.http.get<Grandeur[]>(`${this.baseUrl}`);
  }


  getGrandeurById(id: number): Observable<Grandeur> {
    return this.http.get<Grandeur>(`${this.baseUrl}/${id}`);
  }

  
  createGrandeur(grandeur: Grandeur): Observable<Grandeur> {
    return this.http.post<Grandeur>(`${this.baseUrl}`, grandeur);
  }

 
  updateGrandeur(grandeur: Grandeur): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${grandeur.id}`, grandeur);
  }

  deleteGrandeur(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
