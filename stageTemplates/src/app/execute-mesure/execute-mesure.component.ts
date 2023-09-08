import { Component ,OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMesureGrandeurDialogComponent } from '../add-mesure-grandeur-dialog/add-mesure-grandeur-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MesureService } from '../services/mesure.service';
import { Mesure } from '../models/mesure';
import { GrandeurService } from '../services/grandeur.service';
import { Grandeur } from '../models/grandeur';
import { EditMesureGrandeurDialogComponent } from '../edit-mesure-grandeur-dialog/edit-mesure-grandeur-dialog.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed : boolean;
}
@Component({
  selector: 'app-execute-mesure',
  templateUrl: './execute-mesure.component.html',
  styleUrls: ['./execute-mesure.component.css']
})
export class ExecuteMesureComponent implements OnInit {
  isSideNavCollapsed = false;
  screenWidth = 0;
  mesures: Mesure[] = [];
  grandeur: Grandeur | undefined;
  itemsPerPage: number=5;
  p:number=1;
  onToggleSideNav(data:SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    
  }
  constructor( public dialog: MatDialog,private router: Router,private mesureService: MesureService,private route: ActivatedRoute,private grandeurService: GrandeurService) {}
  ngOnInit(): void {
    this.getGrandeurById(+this.route.snapshot.paramMap.get('grandeurId')!);
    this.getAllMesures();
  }
  
  openAddMesDialog():void{
    const grandeurId=+this.route.snapshot.paramMap.get('grandeurId')!;
    const dialogRef = this.dialog.open(AddMesureGrandeurDialogComponent, {
      width: '700px',
      height: '450px',
      data : {"grandeurId":grandeurId}
 
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'mesureCreated') {
        this.getAllMesures();
      }
    });
  }
  openEditMesDialog(id:number):void{
    const dialogRef = this.dialog.open(EditMesureGrandeurDialogComponent, {
      width: '700px',
      height: '450px',
      data: { mesureId: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'mesureUpdated') {
        this.getAllMesures(); // Manually refresh the user data
      }
    });
}
  getGrandeurById(id: number): void {
    this.grandeurService.getGrandeurById(id).subscribe(
      grandeur => {
        this.grandeur = grandeur;
      },
      error => {
        console.error('Error fetching grandeur', error);
      }
    );
  }
  getAllMesures(): void {
    const grandeurId=+this.route.snapshot.paramMap.get('grandeurId')!;
    this.mesureService.getAllMesures().subscribe(
      (mesures) => {
        this.mesures = mesures.filter(mesure => mesure.grandeurId === grandeurId);
      },
      (error) => {
        console.error('Error fetching mesures', error);
      }
    );
  }
}
