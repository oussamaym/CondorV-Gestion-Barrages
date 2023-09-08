import { Component,OnInit,Inject } from '@angular/core';
import { Grandeur } from '../models/grandeur';
import { SiteGrandeur } from '../models/sitegrandeur';
import { GrandeurService } from '../services/grandeur.service';
import { SiteGrandeurService } from '../services/sitegrandeur.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeGrandeur } from '../models/typegrandeur';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-prop-grandeur-dialog',
  templateUrl: './add-prop-grandeur-dialog.component.html',
  styleUrls: ['./add-prop-grandeur-dialog.component.css']
})
export class AddPropGrandeurDialogComponent  implements OnInit {
  grandeur: Grandeur = new Grandeur();
  sitesGrandeurs: SiteGrandeur|undefined;
  typesGrandeurs: TypeGrandeur[] = [];

   constructor(private route:ActivatedRoute,private grandeurService: GrandeurService,private siteGrandeurService: SiteGrandeurService ,private dialogRef: MatDialogRef<AddPropGrandeurDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
 
   ngOnInit(): void {
     this.getTypesGrandeur(this.data.typeId);
     this.grandeur.typeGrandeurId=this.data.typeId;
   }
ajouter(grandeur: Grandeur):void{
  const siteId=Number(localStorage.getItem('siteId'));
  grandeur.siteId=siteId;
 this.grandeurService.createGrandeur(grandeur).subscribe(
   (response: any) => {
     
     this.dialogRef.close('grandeurCreated'); 
   },

   (error) => {
     // Handle login error here if necessary
     console.error('Post error:', error);
   }
 );
}
getTypesGrandeur(typeGrandeurId:number): void {
  const siteId=Number(localStorage.getItem('siteId'));
 this.siteGrandeurService.getSiteGrandeurBySiteIdAndTypeGrandeurId(siteId,typeGrandeurId).subscribe(
   sitesGrandeurs => {
     this.sitesGrandeurs = sitesGrandeurs;
        const typeGrandeur = this.sitesGrandeurs?.typeGrandeur;
        if (typeGrandeur) {
          this.typesGrandeurs.push(typeGrandeur);
        }

   },
   error => {
     console.error('Error fetching typesGrandeur', error);
   }
 );
}
closeDialog():void{
  this.dialogRef.close();
}
}

