import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  utilisateurconnecte: any | null = null;
  
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  ngOnInit(): void {
    this.getUtilisateur();
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  getUtilisateur(): void {
    this.utilisateurconnecte=localStorage.getItem('utilisateurconnecte');
    if (this.utilisateurconnecte !== null) {
      this.utilisateurconnecte = JSON.parse(this.utilisateurconnecte);
      console.log('Utilisateur connecté : ', this.utilisateurconnecte);
    } else {
      console.log('Utilisateur non connecté.');
    }
  }
}
