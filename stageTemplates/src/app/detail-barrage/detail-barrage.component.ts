import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditSiteDialogComponent } from '../edit-site-dialog/edit-site-dialog.component';
interface SideNavToggle {
  screenWidth: number;
  collapsed : boolean;
}
@Component({
  selector: 'app-detail-barrage',
  templateUrl: './detail-barrage.component.html',
  styleUrls: ['./detail-barrage.component.css']
})
export class DetailBarrageComponent {
  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data:SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    
  }

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(EditSiteDialogComponent, {
      width: '700px',
      height:'700px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }
}
