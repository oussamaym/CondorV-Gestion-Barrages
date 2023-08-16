import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from '../services/site.service';
import { Site } from '../models/site';

@Component({
  selector: 'app-list-barrage',
  templateUrl: './list-sites.component.html',
  styleUrls: ['./list-sites.component.css']
})
export class ListSiteComponent implements OnInit {
  sites: Site[] = [];

  constructor(private siteService: SiteService, private router: Router,private route:ActivatedRoute) {}

  
  ngOnInit(): void {
    const agenceId = +this.route.snapshot.paramMap.get('agenceId')!;
    this.loadBarrages(agenceId);
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
  nav() :void{
    //navigate to navside component
    this.router.navigate(['/navside']);
  }
}

  // You can add other methods for handling user interactions or navigation here

