import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://localhost:7109/api/APIUtilisateurs'; 

  constructor(private http: HttpClient) { }

  // GET: Retrieve all Agences
  getAllUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl}`);
  }

  // GET: Retrieve a single Agence by ID
  getUtilisateurById(id: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}/${id}`);
  }

  // POST: Create a new Agence
  createUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.baseUrl}`, utilisateur);
  }

  // PUT: Update an existing Agence
  updateUtilisateur(utilisateur: Utilisateur): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${utilisateur.id}`, utilisateur);
  }

  // DELETE: Delete an Agence by ID
  deleteUtilisateur(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
