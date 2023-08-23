import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = 'https://localhost:7109/api/APIRoles'; 

  constructor(private http: HttpClient) { }

  
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}`);
  }

  
  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/${id}`);
  }


  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.baseUrl}`, role);
  }

  
  updateRole(role: Role): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${role.id}`, role);
  }

  
  deleteRole(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
