import { Component } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed : boolean;
}
@Component({
  selector: 'app-detail-agence',
  templateUrl: './detail-agence.component.html',
  styleUrls: ['./detail-agence.component.css']
})
export class DetailAgenceComponent {
  
  isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data:SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    
  }
}
