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
  agences: Agence[] = [];

  constructor(private agenceService: AgenceService,private router: Router) {}
  nav(agenceId: number): void {
    this.router.navigate(['/listBarrage', agenceId]);
  }
  ngOnInit(): void {
    this.loadAgences();
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
}
