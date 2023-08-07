import { Component } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = new User();

  constructor(private authService: AuthService, private router: Router) {}

  login(user : User) {
    console.log('User object:', user);
    this.authService.login(user).subscribe(
      (response: any) => {
        // Assuming the response contains the JSON object with AccessToken and Expiration
        const token = response.accessToken;
        const expiration = response.expiration;
        const utilisateur = response.utilisateur;
        const redirectUrl = response.redirectUrl;
        // Store the token in localStorage
        localStorage.setItem('redirectUrl', JSON.stringify(utilisateur));
        localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
        localStorage.setItem('authToken', token);
 
        // Do something with the expiration if needed
        console.log('Token expiration:', expiration);
         //redirect to list-agence.componenent.html
          this.router.navigate(['/listAgence']);

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

