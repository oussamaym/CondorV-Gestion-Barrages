import { Component } from '@angular/core';
import { AddPropriteGrComponent } from '../add-proprite-gr/add-proprite-gr.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddGrandeurDialogComponent } from '../add-grandeur-dialog/add-grandeur-dialog.component';
interface SideNavToggle {
  screenWidth: number;
  collapsed : boolean;
}
@Component({
  selector: 'app-crud-grandeur',
  templateUrl: './crud-grandeur.component.html',
  styleUrls: ['./crud-grandeur.component.css']
})
export class CrudGrandeurComponent {
  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data:SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    
  }
  constructor( public dialog: MatDialog,private router: Router) {}
  openAddPropDialog():void{
    const dialogRef = this.dialog.open(AddPropriteGrComponent, {
      width: '700px',
      height: '700px',
 
    });
  }
  openAddGrDialog(): void {
    const dialogRef = this.dialog.open(AddGrandeurDialogComponent, {
       width: '700px',
       height:'700px',
       
     });
 
   }
}
