import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMesureGrandeurDialogComponent } from '../add-mesure-grandeur-dialog/add-mesure-grandeur-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-execute-mesure',
  templateUrl: './execute-mesure.component.html',
  styleUrls: ['./execute-mesure.component.css']
})
export class ExecuteMesureComponent {
  constructor( public dialog: MatDialog,private router: Router) {}
  openAddMesDialog():void{
    const dialogRef = this.dialog.open(AddMesureGrandeurDialogComponent, {
      width: '700px',
      height: '450px',
 
    });
  }
}
