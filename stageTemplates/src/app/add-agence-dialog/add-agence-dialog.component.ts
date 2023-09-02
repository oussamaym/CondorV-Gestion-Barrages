import { Component } from '@angular/core';
import { Agence } from '../models/agence';
import { AgenceService } from '../services/agence.service';

@Component({
  selector: 'app-add-agence-dialog',
  templateUrl: './add-agence-dialog.component.html',
  styleUrls: ['./add-agence-dialog.component.css']
})
export class AddAgenceDialogComponent {
  nom: string = '';
  ville: string = '';

  constructor(private agenceService: AgenceService) {}

  onSubmit() {
    // Créez un objet Agence à partir des valeurs des champs du formulaire
    const nouvelleAgence: Agence = {
      id: 0,
      nom: this.nom,
      ville: this.ville
    };
  
    // Appelez le service pour créer la nouvelle agence en base de données
    this.agenceService.createAgence(nouvelleAgence).subscribe(
      (agenceCreee) => {
        // La nouvelle agence a été créée avec succès
        console.log('Agence créée avec succès :', agenceCreee);
  
        // Réinitialisez les valeurs des champs du formulaire après la création
        this.nom = '';
        this.ville = '';
      },
      (erreur) => {
        // Gérer les erreurs ici
        console.error('Erreur lors de la création de l\'agence :', erreur);
      }
    );
  }
  
}
