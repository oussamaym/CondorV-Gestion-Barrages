import { Component,OnInit } from '@angular/core';
import { Site } from '../models/site';
import { SiteService } from '../services/site.service';
import { AgenceService } from '../services/agence.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Agence } from '../models/agence';

@Component({
  selector: 'app-add-site-dialog',
  templateUrl: './add-site-dialog.component.html',
  styleUrls: ['./add-site-dialog.component.css']
})
export class AddSiteDialogComponent implements OnInit {
  site: Site = new Site(0,'','',null,'','',null,null,'',null,'',null);
  agences: Agence[] = [];
 constructor(private siteService: SiteService,private agenceService: AgenceService,private router: Router, private dialogRef: MatDialogRef<AddSiteDialogComponent>) {
  }
 ngOnInit(): void {
   this.loadAgences();
 }
 ajouter(site: Site):void{
  this.siteService.createBarrage(site).subscribe(
    (response: any) => {
      console.log(response)
      this.dialogRef.close('siteCreated'); 
    },
    (error) => {
      console.error('Post error:', error);
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

closeDialog():void{
  this.dialogRef.close();
}
} 