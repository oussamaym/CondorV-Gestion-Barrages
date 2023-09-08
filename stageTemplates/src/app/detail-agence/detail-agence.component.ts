import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { EditSiteDialogComponent } from '../edit-site-dialog/edit-site-dialog.component';
import { Agence } from '../models/agence';
import { AgenceService } from '../services/agence.service';
import { EditAgenceDialogComponent } from '../edit-agence-dialog/edit-agence-dialog.component';
import { DeletingDialogComponent } from '../deleting-dialog/deleting-dialog.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed : boolean;
}
@Component({
  selector: 'app-detail-agence',
  templateUrl: './detail-agence.component.html',
  styleUrls: ['./detail-agence.component.css']
})
export class DetailAgenceComponent implements OnInit{
  agence: Agence | undefined;
  constructor(private route: ActivatedRoute,public dialog: MatDialog,private http:HttpClient,private agenceService: AgenceService) {}
  ngOnInit(): void {
    
    var agenceId =null;
    agenceId= +this.route.snapshot.paramMap.get('agenceId')!;
    if(agenceId==0)
    {
      agenceId=Number(localStorage.getItem('agenceId'));
    }
    this.getAgenceById(agenceId);
  }
    getAgenceById(id: number): void {
      this.agenceService.getAgenceById(id).subscribe(
        (agence: Agence) => {
          this.agence = agence;
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération des détails de l\'agence.', error);
        }
      );
    }
  
  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data:SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(EditSiteDialogComponent, {
      width: '700px',
      height:'700px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }
  Modif(idAgence: number| undefined):void {
    if(idAgence != undefined)
    {
      const dialogRef = this.dialog.open(EditAgenceDialogComponent, {
        width: '700px',
        height:'700px',
        data: { idAgence: idAgence }
      });
    }

  }
}
