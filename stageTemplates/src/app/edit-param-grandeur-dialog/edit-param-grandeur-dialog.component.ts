import { Component, OnInit,Inject } from '@angular/core';
import { Grandeur } from '../models/grandeur';
import { GrandeurService } from '../services/grandeur.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-param-grandeur-dialog',
  templateUrl: './edit-param-grandeur-dialog.component.html',
  styleUrls: ['./edit-param-grandeur-dialog.component.css']
})
export class EditParamGrandeurDialogComponent implements OnInit {
  grandeur: Grandeur = new Grandeur();

    constructor(private grandeurService: GrandeurService,private dialogRef: MatDialogRef<EditParamGrandeurDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
  
    ngOnInit(): void {
      if(this.data.grandeurId)
      {
        this.getGrandeurById(this.data.grandeurId);
      }
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

closeDialog():void{
  this.dialogRef.close();
}
}

