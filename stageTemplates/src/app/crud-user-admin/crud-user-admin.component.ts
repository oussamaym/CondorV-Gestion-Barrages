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
import { DeletingDialogComponent } from '../deleting-dialog/deleting-dialog.component';

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
  utilisateursCopy : Utilisateur[] = [];
  roles: Role[] = [];
  sites: Site[] = [];
  agences: Agence[] = [];
   isSideNavCollapsed = false;
  screenWidth = 0;
  itemsPerPage: number=5;
  p:number=1;
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
          data: { "userId": id,"isAdmin":true }
          
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'userUpdated') {
            this.loadUtilisateurs(); // Manually refresh the user data
          }
        });
      }
  
  performSearch(searchTerm: string): void {
    this.utilisateurs=this.utilisateursCopy;
    if (!searchTerm) {
      // If the search term is empty, reset the displayed utilisateurs to the full list
      this.loadUtilisateurs();
    } else {
      searchTerm = searchTerm.toLowerCase();
      this.utilisateurs = this.utilisateurs.filter((utilisateur) =>
      (utilisateur.nom.toLowerCase().includes(searchTerm) ||
       utilisateur.prenom.toLowerCase().includes(searchTerm)||
       utilisateur.userName.toLowerCase().includes(searchTerm)||
       utilisateur.role?.designation.toLowerCase().includes(searchTerm)
       )
    );
    }
  }
  loadUtilisateurs(): void {
    this.userService.getAllUtilisateurs().subscribe(
      utilisateurs => {
        this.utilisateurs = utilisateurs;
        this.utilisateursCopy = utilisateurs;
      },
      error => {
        console.error('Error fetching utilisateurs:', error);
      }
    );
  }
  opendelGrDialog(id:string): void {
    const dialogRef = this.dialog.open(DeletingDialogComponent, {
       width: '500px',
       height:'325px',
       data: {"utilisateurId":id}
       
     });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'utilisateurDeleted') {
          this.loadUtilisateurs();
        }
      });
  
   }
  
}


