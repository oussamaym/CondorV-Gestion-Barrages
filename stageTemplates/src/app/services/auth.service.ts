import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  public login(user : User):Observable<any>{
    return this.http.post<any>('https://localhost:7109/api/Auth/login',user);
    }
}
