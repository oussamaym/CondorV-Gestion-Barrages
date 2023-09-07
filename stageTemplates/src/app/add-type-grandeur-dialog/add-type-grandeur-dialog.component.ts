import { Component,OnInit } from '@angular/core';
import { SiteService } from '../services/site.service';
import { Site } from '../models/site';
import { SiteGrandeur } from '../models/sitegrandeur';
import { Type } from '@angular/compiler';
import { TypeGrandeur } from '../models/typegrandeur';
import { TypeGrandeurService } from '../services/typegrandeur.service';
import { SiteGrandeurService } from '../services/sitegrandeur.service';

@Component({
  selector: 'app-add-type-grandeur-dialog',
  templateUrl: './add-type-grandeur-dialog.component.html',
  styleUrls: ['./add-type-grandeur-dialog.component.css']
})
export class AddTypeGrandeurDialogComponent implements OnInit {
  siteGrandeur : SiteGrandeur = new SiteGrandeur(0,0);
  typeGrandeur : TypeGrandeur = new TypeGrandeur(0,"");
  sites : Site[] = [];
  typesGrandeurs: TypeGrandeur[]= [];
 constructor(private siteService: SiteService,private typeGrandeurService: TypeGrandeurService,private siteGrandeurService: SiteGrandeurService){
 }
 ngOnInit(): void {
   this.loadBarrages();
   this.getAllTypesGrandeurs();
 }
 loadBarrages(): void {
  this.siteService.getAllBarrages().subscribe(
    sites => {
      this.sites = sites;
    },
    error => {
      console.error('Error fetching Barrages:', error);
    }
  );
}
getAllTypesGrandeurs(): void {
  this.typeGrandeurService.getAllTypeGrandeurs().subscribe(
    typesGrandeurs => {
      this.typesGrandeurs = typesGrandeurs;
    },
    error => {
      console.error('Error fetching TypesGrandeurs:', error);
    }
  );
}
ajouterSiteGrandeur(siteGrandeur: SiteGrandeur) :void
{
  this.siteGrandeurService.createSiteGrandeur(siteGrandeur).subscribe(
    (response: any) => {
      console.log(response)
    },
    (error) => {
      // Handle login error here if necessary
      console.error('Post error:', error);
    }
  );
}
ajouterTypeGrandeur(typeGrandeur : TypeGrandeur) :void
{
  this.typeGrandeurService.createTypeGrandeur(typeGrandeur).subscribe(
    (response: any) => {
      console.log(response)
    },
    (error) => {
      // Handle login error here if necessary
      console.error('Post error:', error);
    }
  );
}

}