import { Component,OnInit,Inject } from '@angular/core';
import { Mesure } from '../models/mesure';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MesureService } from '../services/mesure.service';

@Component({
  selector: 'app-add-mesure-grandeur-dialog',
  templateUrl: './add-mesure-grandeur-dialog.component.html',
  styleUrls: ['./add-mesure-grandeur-dialog.component.css']
})
export class AddMesureGrandeurDialogComponent implements OnInit {
  mesure: Mesure = new Mesure(0, new Date(), null, 0);

    constructor(private dialogRef: MatDialogRef<AddMesureGrandeurDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private mesureService: MesureService) { }
    ngOnInit(): void {
    }
  ajouter(mesure: Mesure):void{
    mesure.grandeurId=this.data.grandeurId;
    this.mesureService.createMesure(mesure).subscribe(
      (response: any) => {
        
        this.dialogRef.close('mesureCreated'); 
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
