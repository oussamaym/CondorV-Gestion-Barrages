import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModel } from '../models/authmodel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  public login(authmodel : AuthModel):Observable<any>{
    return this.http.post<any>('https://localhost:7109/api/Auth/login',authmodel);
    }
}
