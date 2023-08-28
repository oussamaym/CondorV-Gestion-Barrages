import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from '../services/site.service';
import { SiteIdService } from '../services/site-id.service';
import { Site } from '../models/site';

@Component({
  selector: 'app-list-barrage',
  templateUrl: './list-sites.component.html',
  styleUrls: ['./list-sites.component.css']
})
export class ListSiteComponent implements OnInit {
  sites: Site[] = [];
  utilisateurconnecte: any | null = null;
  constructor(private siteService: SiteService, private siteIdService: SiteIdService,private router: Router,private route:ActivatedRoute) {}

  
  ngOnInit(): void {
    const agenceId = +this.route.snapshot.paramMap.get('agenceId')!;
    this.loadBarrages(agenceId);
    this.getUtilisateur();
  }
  

  loadBarrages(agenceId: number): void {
    this.siteService.getAllBarrages().subscribe(
      sites => {
        // Filter barrages based on the agenceId
        this.sites = sites.filter(site => site.agenceId === agenceId);
      },
      error => {
        console.error('Error fetching Barrages:', error);
      }
    );
  }
  nav(siteId: number): void {
    localStorage.setItem('siteId', siteId.toString());
    this.router.navigate(['/detailBarrage']);
  }
  getUtilisateur(): void {
    this.utilisateurconnecte=localStorage.getItem('utilisateurconnecte');
    if (this.utilisateurconnecte !== null) {
      this.utilisateurconnecte = JSON.parse(this.utilisateurconnecte);
      
    } else {
      console.log('Erreur');
    }
  }
}

  // You can add other methods for handling user interactions or navigation here

