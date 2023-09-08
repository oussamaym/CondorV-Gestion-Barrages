import { Component, OnInit } from '@angular/core';
import { Grandeur } from '../models/grandeur';
import { GrandeurService } from '../services/grandeur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeletingDialogComponent } from '../deleting-dialog/deleting-dialog.component';
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
  grandeursCopy: Grandeur[] = [];
  typegrandeur: any | null = null;
  isSideNavCollapsed = false;
  screenWidth = 0;
  itemsPerPage: number=5;
  p:number=1;
  onToggleSideNav(data:SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  constructor(private grandeurService: GrandeurService,private route: ActivatedRoute,public dialog: MatDialog,private router: Router) { }
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
  EditerMesures(grandeurId: number):void{
    this.router.navigate(['/grandeurMesure', grandeurId]);
  }

  getAllGrandeurs(): void {
    const siteId=Number(localStorage.getItem('siteId'));
    this.grandeurService.getAllGrandeurs().subscribe(
      grandeurs => {
        this.grandeurs = grandeurs.filter(grandeur => grandeur.typeGrandeurId == this.typegrandeur && grandeur.siteId==siteId);
        this.grandeursCopy=this.grandeurs;
      },  
      error => {
        console.error('Error fetching Grandeurs:', error);
      }     
    );
}
performSearch(searchTerm: string): void {
  this.grandeurs=this.grandeursCopy;
  if (!searchTerm) {
    // If the search term is empty, reset the displayed utilisateurs to the full list
    this.getAllGrandeurs();
  } else {
    searchTerm = searchTerm.toLowerCase();
    this.grandeurs = this.grandeurs.filter((grandeur) =>
    (grandeur.nomAbrege?.toLowerCase().includes(searchTerm) ||
     grandeur.localisationBarr?.toLowerCase().includes(searchTerm)||
     grandeur.modeAcquisition?.toLowerCase().includes(searchTerm)||
     grandeur.nomGrandeur?.toLowerCase().includes(searchTerm)
     )
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
opendelGrDialog(id:number): void {
  const dialogRef = this.dialog.open(DeletingDialogComponent, {
     width: '500px',
     height:'325px',
     data: {"grandeurId":id}
     
   });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'grandeurDeleted') {
        this.getAllGrandeurs(); // Manually refresh the user data
      }
    });

 }
  }
  
  
