import { Component , OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { Utilisateur } from '../models/user';
import { UserService } from '../services/user.service';
import { SiteService } from '../services/site.service';
import { AgenceService } from '../services/agence.service';
import { Site } from '../models/site';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role';
import { Agence } from '../models/agence';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

interface AdminSideNavToggle {
  screenWidth: number;
  collapsed : boolean;
}
@Component({
  selector: 'app-crud-user-admin',
  templateUrl: './crud-user-admin.component.html',
  styleUrls: ['./crud-user-admin.component.css']
})
export class CrudUserAdminComponent  implements OnInit{
  utilisateurs: Utilisateur[] = [];
  roles: Role[] = [];
  sites: Site[] = [];
  agences: Agence[] = [];
   isSideNavCollapsed = false;
  screenWidth = 0;
  onToggleSideNav(data:AdminSideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  constructor(public dialog: MatDialog,private roleService: RoleService,private userService: UserService,private siteService: SiteService,private agenceService: AgenceService) {}
  ngOnInit(): void {
      this.loadUtilisateurs();
   
  }
  openAddUserDialog(): void {
        const dialogRef = this.dialog.open(AddUserDialogComponent, {
          width: '700px',
          height: '700px',
          data: { "isAdmin":true}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'userCreated') {
            this.loadUtilisateurs(); // Manually re fresh the user data
          }
        });
  
      }
      openEditUserDialog(id: string): void {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
          width: '700px',
          height:'700px',
          data: { userId: id }
          
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'userUpdated') {
            this.loadUtilisateurs(); // Manually refresh the user data
          }
        });
      }
  
  performSearch(searchTerm: string): void {
    if (!searchTerm) {
      console.log("dkhel if");
      // If the search term is empty, reset the displayed utilisateurs to the full list
      this.loadUtilisateurs();
    } else {
      console.log("dkhel else");
      // Filter the utilisateurs based on partial matches of the search term
      searchTerm = searchTerm.toLowerCase(); // Convert the search term to lowercase for case-insensitive search
      this.utilisateurs = this.utilisateurs.filter((utilisateur) =>
        (utilisateur.nom.toLowerCase().includes(searchTerm) ||
        utilisateur.prenom.toLowerCase().includes(searchTerm))
      );
    }
  }
  loadUtilisateurs(): void {
    this.userService.getAllUtilisateurs().subscribe(
      utilisateurs => {
        this.utilisateurs = utilisateurs;
      },
      error => {
        console.error('Error fetching utilisateurs:', error);
      }
    );
  }
  supprimer(id: string):void
  {
    this.userService.deleteUtilisateur(id).subscribe(
      (response: any) => {
        this.loadUtilisateurs();
      }, 
      (error) => {
        console.error('Delete error:', error);
      }
    );
  }
  
}


