import { Component,OnInit } from '@angular/core';
import { Site } from '../models/site';
import { SiteService } from '../services/site.service';
import { MatDialog } from '@angular/material/dialog';
import { EditSiteDialogComponent } from '../edit-site-dialog/edit-site-dialog.component';
import { DeletingDialogComponent } from '../deleting-dialog/deleting-dialog.component';
import { AddSiteDialogComponent } from '../add-site-dialog/add-site-dialog.component';
interface AdminSideNavToggle {
  screenWidth: number;
  collapsed : boolean;
}
@Component({
  selector: 'app-crud-site',
  templateUrl: './crud-site.component.html',
  styleUrls: ['./crud-site.component.css']
})
export class CrudSiteComponent implements OnInit {
  sites: Site[]= [];
  p:number=1;
  itemsPerPage: number=5;
  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data:AdminSideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
constructor(private siteService: SiteService,private dialog: MatDialog){}
ngOnInit(): void {
  this.getAllSites();
}
getAllSites(): void {
  this.siteService.getAllBarrages().subscribe(
    sites => {
      this.sites = sites;
    },
    error => {
      console.error('Error fetching sites:', error);
    }
  );
}
openEditSiteDialog(id: number):void{
  const dialogRef = this.dialog.open(EditSiteDialogComponent, {
    width: '700px',
    height:'700px',
    data: { siteId: id }
    
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === 'siteUpdated') {
      this.getAllSites(); 
    }
  });
}
openAddSiteDialog():void{
  const dialogRef = this.dialog.open(AddSiteDialogComponent, {
    width: '700px',
    height: '700px',

  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === 'siteCreated') {
      this.getAllSites();
    }
  });
}   
opendelGrDialog(id:number): void {
  const dialogRef = this.dialog.open(DeletingDialogComponent, {
     width: '500px',
     height:'325px',
     data: {"siteId":id}
     
   });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'siteDeleted') {
        this.getAllSites();
      }
    });

 }

}
