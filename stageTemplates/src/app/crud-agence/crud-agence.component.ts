import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AgenceService } from '../services/agence.service';
import { AddAgenceDialogComponent } from '../add-agence-dialog/add-agence-dialog.component';
import { EditAgenceDialogComponent } from '../edit-agence-dialog/edit-agence-dialog.component';
import { Agence } from '../models/agence';
import { DeletingDialogComponent } from '../deleting-dialog/deleting-dialog.component';
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
  agences: Agence[] = [];
  itemsPerPage: number=5;
  p:number=1;

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
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'agenceCreated') {
          this.getAgences(); // Manually refresh the user data
        }
      }
      );
    }
    opendelGrDialog(id:number): void {
      const dialogRef = this.dialog.open(DeletingDialogComponent, {
         width: '500px',
         height:'325px',
         data: {"agenceId":id}
         
       });
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'agenceDeleted') {
            this.getAgences(); // Manually refresh the user data
          }
        });
    
     }
    
  
    Modif(idAgence: number):void {
      const dialogRef = this.dialog.open(EditAgenceDialogComponent, {
        width: '700px',
        height:'700px',
        data: { idAgence: idAgence }
      });

    }
  }
