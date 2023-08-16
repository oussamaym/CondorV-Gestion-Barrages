import { Component } from '@angular/core';
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
}
