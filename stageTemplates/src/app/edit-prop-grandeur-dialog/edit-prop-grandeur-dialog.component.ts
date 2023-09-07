import { Component,OnInit ,Inject} from '@angular/core';
import { Grandeur } from '../models/grandeur';
import { GrandeurService } from '../services/grandeur.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeGrandeur } from '../models/typegrandeur';
import { TypeGrandeurService } from '../services/typegrandeur.service';
import { LocalisationBarr } from '../models/localisationbarr';
import { LocalisationBarrService } from '../services/localisationbarr.service';

@Component({
  selector: 'app-edit-prop-grandeur-dialog',
  templateUrl: './edit-prop-grandeur-dialog.component.html',
  styleUrls: ['./edit-prop-grandeur-dialog.component.css']
})
export class EditPropGrandeurDialogComponent implements OnInit {
   grandeur: Grandeur = new Grandeur();
   typesGrandeur: TypeGrandeur[] = [];
   localisations: LocalisationBarr[] = [];

    constructor(private localisationService: LocalisationBarrService,private grandeurService: GrandeurService,private typeGrandeurService: TypeGrandeurService ,private dialogRef: MatDialogRef<EditPropGrandeurDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
  
    ngOnInit(): void {
      if(this.data.grandeurId)
      {
        this.getGrandeurById(this.data.grandeurId);
      }
      this.getAllTypesGrandeur();
      this.loadLocalisationBarrs();
    }
getGrandeurById(id: number): void {
  this.grandeurService.getGrandeurById(id).subscribe(
    grandeur => {
      this.grandeur = grandeur;
    },
    error => {
      console.error('Error fetching grandeur', error);
    }
  );  
}
modifier(grandeur: Grandeur):void{
  this.grandeurService.updateGrandeur(grandeur).subscribe(
    (response: any) => {
      
      this.dialogRef.close('grandeurUpdated'); 
    },
    (error) => {
      // Handle login error here if necessary
      console.error('Post error:', error);
    }
  );
}
getAllTypesGrandeur(): void {
  this.typeGrandeurService.getAllTypeGrandeurs().subscribe(
    typesGrandeur => {
      this.typesGrandeur = typesGrandeur;
    },
    error => {
      console.error('Error fetching typesGrandeur', error);
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
closeDialog():void{
  this.dialogRef.close();
}
}
