import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AgenceService } from '../services/agence.service';
import { AddAgenceDialogComponent } from '../add-agence-dialog/add-agence-dialog.component';
import { EditAgenceDialogComponent } from '../edit-agence-dialog/edit-agence-dialog.component';
interface SideNavToggle {
  screenWidth: number;
  collapsed : boolean;
}
@Component({
  selector: 'app-crud-agence',
  templateUrl: './crud-agence.component.html',
  styleUrls: ['./crud-agence.component.css']
})
export class CrudAgenceComponent implements OnInit {
  agences?: any[] ;

  constructor(private http: HttpClient, public dialog: MatDialog,private router: Router,private agenceService: AgenceService) {}

  ngOnInit(): void {
    this.getAgences();
  }
  getAgences() {
    // Utilisez HttpClient pour effectuer la requête GET
    this.agenceService.getAllAgences().subscribe(
      (data) => {
        this.agences = data; // Stockez les agences dans la variable du composant
        console.log(this.agences);
        
      },
      (error) => {
        console.error('Erreur:', error);
      }
    );
  }

    isSideNavCollapsed = false;
    screenWidth = 0;
    onToggleSideNav(data:SideNavToggle): void{
      this.screenWidth = data.screenWidth;
      this.isSideNavCollapsed = data.collapsed;
      
    }
    
    afficherDetailsAgence(id: number) {
      this.router.navigate(['detailAgence', id]);
    }
    openDialogee(): void {
     const dialogRef = this.dialog.open(AddAgenceDialogComponent, {
        width: '700px',
        height:'700px',
        
      });
  
    }
    Suppr(idAgence: number): void {
      // Effectuer une requête DELETE à votre API en utilisant l'ID passé en argument
      this.agenceService.deleteAgence(idAgence).subscribe(
          () => {
            // L'agence a été supprimée avec succès
            alert('Agence supprimée avec succès');
            window.location.reload();

            // Vous pouvez également effectuer d'autres actions ici si nécessaire, par exemple, mettre à jour votre liste d'agences après la suppression.
          },
          (error) => {
            // Gérer les erreurs ici
            console.error('Erreur:', error);
          }
        );
    }
    
  
    Modif():void {
      const dialogRef = this.dialog.open(EditAgenceDialogComponent, {
        width: '700px',
        height:'700px',
        
      });

    }
  }
