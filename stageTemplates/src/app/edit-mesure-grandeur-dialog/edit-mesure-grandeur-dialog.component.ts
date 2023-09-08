import { Component,OnInit,Inject } from '@angular/core';
import { Mesure } from '../models/mesure';
import { MesureService } from '../services/mesure.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-mesure-grandeur-dialog',
  templateUrl: './edit-mesure-grandeur-dialog.component.html',
  styleUrls: ['./edit-mesure-grandeur-dialog.component.css']
})
export class EditMesureGrandeurDialogComponent implements OnInit{
  mesure: Mesure = new Mesure(0, new Date(), null, 0);
   constructor(private mesureService: MesureService,private dialogRef: MatDialogRef<EditMesureGrandeurDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any ) { }
    ngOnInit(): void {
    this.getMesureById(this.data.mesureId);
    }
  getMesureById(id: number): void {
    this.mesureService.getMesureById(id).subscribe(
      mesure => {
        this.mesure = mesure;
      },
      error => {
        console.error('Error fetching mesure', error);
      }
    );
  }
  modifier(mesure: Mesure):void{
    this.mesureService.updateMesure(mesure).subscribe(
      (response: any) => {
        this.dialogRef.close('mesureUpdated'); 
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
