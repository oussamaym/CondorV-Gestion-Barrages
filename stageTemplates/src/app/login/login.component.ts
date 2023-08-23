import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthModel } from '../models/authmodel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authmodel = new AuthModel();

  constructor(private authService: AuthService, private router: Router) {}

  login(authmodel : AuthModel) {
    this.authService.login(authmodel).subscribe(
      (response: any) => {
        // Assuming the response contains the JSON object with AccessToken and Expiration
        const token = response.accessToken;
        const expiration = response.expiration;
        const utilisateurconnecte = response.utilisateurConnecte;
       
        // Store the token in localStorage
        localStorage.setItem('utilisateurconnecte', JSON.stringify(utilisateurconnecte));
        localStorage.setItem('authToken', token);
        // Do something with the expiration if needed
         //redirect to list-agence.componenent.html
          this.router.navigate(['/listAgences']);

         //window.location.href = redirectUrl;

        // Optionally, you can redirect the user to another route upon successful login
        // this.router.navigate(['/dashboard']); // Make sure to import Router from '@angular/router'
      },
      (error) => {
        // Handle login error here if necessary
        console.error('Login error:', error);
      }
    );
  }
}

