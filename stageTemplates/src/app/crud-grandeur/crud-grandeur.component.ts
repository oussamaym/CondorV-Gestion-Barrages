import { Component } from '@angular/core';
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
}
