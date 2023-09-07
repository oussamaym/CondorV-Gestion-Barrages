import { Component, OnInit } from '@angular/core';
import { Grandeur } from '../models/grandeur';
import { GrandeurService } from '../services/grandeur.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditPropGrandeurDialogComponent } from '../edit-prop-grandeur-dialog/edit-prop-grandeur-dialog.component';
import { AddPropGrandeurDialogComponent } from '../add-prop-grandeur-dialog/add-prop-grandeur-dialog.component';
import { EditParamGrandeurDialogComponent } from '../edit-param-grandeur-dialog/edit-param-grandeur-dialog.component';
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
      this.typegrandeur = params['typeId'];
      this.getAllGrandeurs();
    });
  }
  EditProprieteGrandeurDialog(id: number): void {
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
  AddProprieteGrandeurDialog():void{
    const typeId = +this.route.snapshot.paramMap.get('typeId')!;
    const dialogRef = this.dialog.open(AddPropGrandeurDialogComponent, {
      width: '700px',
      height: '700px',
      data: { typeId: typeId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'grandeurCreated') {
        this.getAllGrandeurs(); // Manually refresh the user data
      }
    });

  }
  EditerMesures(id: number):void{
    
  }

  getAllGrandeurs(): void {
    const siteId=Number(localStorage.getItem('siteId'));
    this.grandeurService.getAllGrandeurs().subscribe(
      grandeurs => {
        this.grandeurs = grandeurs.filter(grandeur => grandeur.typeGrandeurId == this.typegrandeur && grandeur.siteId==siteId);
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
  EditParamGrandeurDialog(id:number):void{
    const dialogRef = this.dialog.open(EditParamGrandeurDialogComponent, {
      width: '700px',
      height: '700px',
      data: { grandeurId: id }
      
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'grandeurUpdated') {
        this.getAllGrandeurs(); // Manually refresh the user data
      }
    });
}
}
