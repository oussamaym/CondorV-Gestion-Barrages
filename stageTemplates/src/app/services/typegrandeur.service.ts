import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeGrandeur } from '../models/typegrandeur';

@Injectable({
  providedIn: 'root'
})
export class TypeGrandeurService {

  private baseUrl = 'https://localhost:7109/api/APITypeGrandeurs'; 

  constructor(private http: HttpClient) { }


  getAllTypeGrandeurs(): Observable<TypeGrandeur[]> {
    return this.http.get<TypeGrandeur[]>(`${this.baseUrl}`);
  }

 
  getTypeGrandeurById(id: number): Observable<TypeGrandeur> {
    return this.http.get<TypeGrandeur>(`${this.baseUrl}/${id}`);
  }

  
  createTypeGrandeur(agence: TypeGrandeur): Observable<TypeGrandeur> {
    return this.http.post<TypeGrandeur>(`${this.baseUrl}`, agence);
  }

  updateTypeGrandeur(typegrandeur: TypeGrandeur): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${typegrandeur.id}`, typegrandeur);
  }

  deleteTypeGrandeur(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
