import { Component ,  OnInit} from '@angular/core';
import { Site } from '../models/site';
import { Agence } from '../models/agence';
import { LocalisationBarr } from '../models/localisationbarr';
import { LocalisationBarrService } from '../services/localisationbarr.service';
import { SiteService } from '../services/site.service';
import { AgenceService } from '../services/agence.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-site-dialog',
  templateUrl: './edit-site-dialog.component.html',
  styleUrls: ['./edit-site-dialog.component.css']
})
export class EditSiteDialogComponent implements OnInit {
  site: Site = new Site(0,'',0,0,'','',0,0,'','','',0);
  agences: Agence[] = [];
  localisations: LocalisationBarr[] = [];
 constructor(private localisationService: LocalisationBarrService,private siteService: SiteService,private agenceService: AgenceService,private router: Router, private dialogRef: MatDialogRef<EditSiteDialogComponent>) {
  }
 ngOnInit(): void {
  const siteId = Number(localStorage.getItem('siteId'));
  this.getSiteById(siteId);
   this.loadAgences();
   this.loadLocalisationBarrs();
  
 }
 modifier(site: Site):void{
  this.siteService.updateBarrage(site).subscribe(
    (response: any) => {
      console.log(response)
      this.dialogRef.close('siteUpdated'); 
    },
    (error) => {
      // Handle login error here if necessary
      console.error('Post error:', error);
    }
  );
}
 loadLocalisationBarrs(): void {
   this.localisationService.getAllLocalisations().subscribe(
    localisations => {
       this.localisations = localisations;
     
     },
     error => {
       console.error('Error fetching Localisations', error);
     }
   );
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
 getSiteById(id:number): void {
  if (id !== null) {
    // Call the service to fetch user details by ID
    this.siteService.getBarrageById(id).subscribe(
      site => {
        this.site= site;
      },
      error => {
        console.error('Error fetching site details:', error);
      }
    );
  }


}
}