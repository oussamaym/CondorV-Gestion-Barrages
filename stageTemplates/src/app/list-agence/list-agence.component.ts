import { Component, OnInit } from '@angular/core';
import { AgenceService } from '../services/agence.service'; // Import your AgenceService
import { Agence } from '../models/agence'; // Import your Agence model
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-agence',
  templateUrl: './list-agence.component.html',
  styleUrls: ['./list-agence.component.css']
})
export class ListAgenceComponent implements OnInit {
  utilisateurconnecte: any | null = null;
  agences: Agence[] = [];

  constructor(private agenceService: AgenceService,private router: Router) {}
  nav(agenceId: number): void {
    localStorage.setItem('agenceId', agenceId.toString());
    this.router.navigate(['/listSites', agenceId]);
  }
  ngOnInit(): void {
    this.loadAgences();
    this.getUtilisateur();
  }

  loadAgences(): void {
    this.agenceService.getAllAgences().subscribe(
      agences => {
        this.agences = agences;
      },
      error => {
        console.error('Error fetching Agences:', error);
      }
    );
  }
  getUtilisateur(): void {
    this.utilisateurconnecte=localStorage.getItem('utilisateurconnecte');
    if (this.utilisateurconnecte !== null) {
      this.utilisateurconnecte = JSON.parse(this.utilisateurconnecte);
      console.log('Utilisateur connecté : ', this.utilisateurconnecte);
    } else {
      console.log('Utilisateur non connecté.');
    }
  }
}
