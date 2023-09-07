import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { INavbarData } from './helper';
import { Router } from '@angular/router';
import { TypeGrandeurService } from '../services/typegrandeur.service';
import { GrandeurService } from '../services/grandeur.service';
import { Type } from '@angular/compiler';
import { TypeGrandeur } from '../models/typegrandeur';
import { Grandeur } from '../models/grandeur';
import { SiteGrandeur } from '../models/sitegrandeur';
import { SiteGrandeurService } from '../services/sitegrandeur.service';

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
  siteGrandeurs: SiteGrandeur[] = [];
 
  utilisateurconnecte: any | null = null;
  
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple : boolean =false;
  constructor(private router: Router,private siteGrandeurService: SiteGrandeurService) { }

  ngOnInit(): void {
    const siteId=Number(localStorage.getItem('siteId'));
    this.getUtilisateur();
    this.getAllTypeGrandeur(siteId); 
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  handleClick(item:INavbarData): void{
    if(!this.multiple){
      for(let modelItem of this.navData){
        if(item !== modelItem && modelItem.expanded){
            modelItem.expanded=false;
        }
      }
    }
    item.expanded = !item.expanded
  }

  getUtilisateur(): void {
    this.utilisateurconnecte=localStorage.getItem('utilisateurconnecte');
    if (this.utilisateurconnecte !== null) {
      this.utilisateurconnecte = JSON.parse(this.utilisateurconnecte);
     
    } else {
      console.log('Erreur.');
    }
  }
  logout():void{
    localStorage.clear();
  
  this.router.navigate(['/']);
  }

  getAllTypeGrandeur(id:number): void {
    if (id !== null) {
      // Call the service to fetch user details by ID
      this.siteGrandeurService.getSiteGrandeurBySiteId(id).subscribe(
        siteGrandeurs => {
          this.siteGrandeurs= siteGrandeurs;
          // Map typeGrandeurs to items for grandeur section
        const grandeurItems = this.siteGrandeurs.map(type => {
          return {
            routelink: '/crudGrandeur/'+type.typeGrandeurId,
            label: type.typeGrandeur?.nom|| 'Default Label',
          };
        });
  
        // Update grandeur section in navbarData
        const grandeurSection = this.navData.find(item => item.label=== 'Grandeur');

        // If grandeur section is found, update its items
        if (grandeurSection) {
          grandeurSection.items = grandeurItems;
        }
  
  
        },
        error => {
          console.error('Error fetching site details:', error);
        }
      );
    }
  }
  
}
