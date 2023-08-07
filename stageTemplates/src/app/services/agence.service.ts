import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agence } from '../models/agence';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  private baseUrl = 'https://localhost:7109/api/APIAgences'; 

  constructor(private http: HttpClient) { }

  // GET: Retrieve all Agences
  getAllAgences(): Observable<Agence[]> {
    return this.http.get<Agence[]>(`${this.baseUrl}`);
  }

  // GET: Retrieve a single Agence by ID
  getAgenceById(id: number): Observable<Agence> {
    return this.http.get<Agence>(`${this.baseUrl}/${id}`);
  }

  // POST: Create a new Agence
  createAgence(agence: Agence): Observable<Agence> {
    return this.http.post<Agence>(`${this.baseUrl}`, agence);
  }

  // PUT: Update an existing Agence
  updateAgence(agence: Agence): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${agence.id}`, agence);
  }

  // DELETE: Delete an Agence by ID
  deleteAgence(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
