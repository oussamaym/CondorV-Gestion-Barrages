import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditSiteDialogComponent } from '../edit-site-dialog/edit-site-dialog.component';
import { SiteService } from '../services/site.service';
import { Site } from '../models/site';
interface SideNavToggle {
  screenWidth: number;
  collapsed : boolean;
}
@Component({
  selector: 'app-detail-barrage',
  templateUrl: './detail-barrage.component.html',
  styleUrls: ['./detail-barrage.component.css']
})
export class DetailBarrageComponent implements OnInit {
   siteId = Number(localStorage.getItem('siteId'));
  site: Site | undefined;
  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data:SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  constructor(public dialog: MatDialog,private siteService: SiteService) {}
  ngOnInit(): void {
    
    this.loadSiteById(this.siteId);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditSiteDialogComponent, {
      width: '700px',
      height:'700px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'siteUpdated') {
        this.loadSiteById(this.siteId); // Manually refresh the user data
      }
    });
  }
  loadSiteById(id: number): void {
      this.siteService.getBarrageById(id).subscribe(
        site => {
          this.site = site;
          // Do any further processing with the fetched user details
        },
        error => {
          console.error('Error fetching site details:', error);
        }
      );
  }
}
