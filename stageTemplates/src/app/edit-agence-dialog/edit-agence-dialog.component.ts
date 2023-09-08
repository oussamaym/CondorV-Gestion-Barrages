import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Agence } from '../models/agence';
import { AgenceService } from '../services/agence.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-agence-dialog',
  templateUrl: './edit-agence-dialog.component.html',
  styleUrls: ['./edit-agence-dialog.component.css']
})
export class EditAgenceDialogComponent implements OnInit{
  agence: Agence = new Agence(); // Initialisation d'une agence vide
  agenceId: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditAgenceDialogComponent>,
    private agenceService: AgenceService
  ) {
    this.agenceId = data.idAgence; // Récupérez l'ID de l'agence depuis les données passées
  }
  ngOnInit(): void {
    // Chargez les informations de l'agence en utilisant l'ID
    this.loadAgence();
  }
  loadAgence() {
    this.agenceService.getAgenceById(this.agenceId).subscribe(
      (agence: Agence) => {
        this.agence = agence; // Stockez les données de l'agence dans la propriété agence
      },
      (error) => {
        // Gérez les erreurs ici si nécessaire
        console.error(error);
      }
      
    );
  }
  onSubmit() {
    // Envoyez les modifications de l'agence au service
    this.agenceService.updateAgence(this.agence).subscribe(
      (response) => {
        // Gérez la réponse du service ici, par exemple, fermez le dialogue
        this.dialogRef.close(response);
        window.location.reload();
      },
      (error) => {
        // Gérez les erreurs ici si nécessaire
        console.error(error);
      }
    );
  }
  closeDialog() :void{
    this.dialogRef.close();
  }
  
  
}
