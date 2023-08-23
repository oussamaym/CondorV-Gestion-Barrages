import { Component } from '@angular/core';
interface SideNavToggle {
  screenWidth: number;
  collapsed : boolean;
}
@Component({
  selector: 'app-crud-agence',
  templateUrl: './crud-agence.component.html',
  styleUrls: ['./crud-agence.component.css']
})
export class CrudAgenceComponent {
  

    isSideNavCollapsed = false;
    screenWidth = 0;
    onToggleSideNav(data:SideNavToggle): void{
      this.screenWidth = data.screenWidth;
      this.isSideNavCollapsed = data.collapsed;
      
    }
  
}
