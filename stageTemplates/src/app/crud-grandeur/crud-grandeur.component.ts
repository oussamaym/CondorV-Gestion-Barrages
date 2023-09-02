import { Component, OnInit } from '@angular/core';
import { Grandeur } from '../models/grandeur';
import { GrandeurService } from '../services/grandeur.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditPropGrandeurDialogComponent } from '../edit-prop-grandeur-dialog/edit-prop-grandeur-dialog.component';
import { AddPropriteGrComponent } from '../add-proprite-gr/add-proprite-gr.component';
interface SideNavToggle {
  screenWidth: number;
  collapsed : boolean;
}
@Component({
  selector: 'app-crud-grandeur',
  templateUrl: './crud-grandeur.component.html',
  styleUrls: ['./crud-grandeur.component.css']
})
export class CrudGrandeurComponent implements OnInit {
  grandeurs: Grandeur[] = [];
  typegrandeur: any | null = null;
  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data:SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  constructor(private grandeurService: GrandeurService,private route: ActivatedRoute,public dialog: MatDialog) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.typegrandeur = params['typegrandeurId'];
      this.getAllGrandeurs();
    });
  }
  openProprieteGrandeurDialog(id: number): void {
    const dialogRef = this.dialog.open(EditPropGrandeurDialogComponent, {
      width: '700px',
      height:'700px',
      data: { grandeurId: id }
      
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'grandeurUpdated') {
        this.getAllGrandeurs(); // Manually refresh the user data
      }
    });
  }
  getAllGrandeurs(): void {
    this.grandeurService.getAllGrandeurs().subscribe(
      grandeurs => {
        this.grandeurs = grandeurs.filter(grandeur => grandeur.typeGrandeurId == this.typegrandeur);
      },  
      error => {
        console.error('Error fetching Grandeurs:', error);
      }     
    );
}
performSearch(searchTerm: string): void {
  if (!searchTerm) {
    // If the search term is empty, reset the displayed grandeurs to the full list
    this.getAllGrandeurs();
  } else {
    // Filter the grandeurs based on the search term
    this.grandeurs = this.grandeurs.filter((grandeur) =>
      grandeur.modeAcquisition?.includes(searchTerm) ||
      grandeur.localisationBarr.designation.includes(searchTerm) ||
      grandeur.nomAbrege?.includes(searchTerm)
    );
  }
}
  openAddPropDialog():void{
    const dialogRef = this.dialog.open(AddPropriteGrComponent, {
      width: '700px',
      height: '700px',
 
    });
  }
}
