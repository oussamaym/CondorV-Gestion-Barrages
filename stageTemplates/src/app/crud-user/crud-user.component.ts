import { Component , OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { SiteIdService } from '../services/site-id.service';
import { Utilisateur } from '../models/user';
import { UserService } from '../services/user.service';
import { AddRoleDialogComponent } from '../add-role-dialog/add-role-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from '../services/site.service';
import { AgenceService } from '../services/agence.service';
import { Site } from '../models/site';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role';
import { Agence } from '../models/agence';
import { DeletingDialogComponent } from '../deleting-dialog/deleting-dialog.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed : boolean;
}

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  styleUrls: ['./crud-user.component.css'],
  
})
export class CrudUserComponent  implements OnInit{
  utilisateurs: Utilisateur[] = [];
  isSideNavCollapsed = false;
  screenWidth = 0;
  utilisateurconnecte: any | null = null;
  cond: string = '';
  role: Role[] = [];
  site: undefined | Site = undefined;
   agence: undefined | Agence = undefined;
    itemsPerPage: number=5;
    p:number=1;
    totalNumber: any;
  onToggleSideNav(data:SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    
  }

  constructor(public dialog: MatDialog,private roleService: RoleService,private userService: UserService,private route: ActivatedRoute,private siteService: SiteService,private agenceService: AgenceService) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cond = params['value'];
      this.getUtilisateur();
      this.loadUtilisateurs();
    });
  }
  async openAddUserDialog(): Promise<void> {
    if (this.cond == "BAR") {
      const siteId = Number(localStorage.getItem('siteId'));
  
      try {
        const site = await new Promise<Site>((resolve, reject) => {
          this.siteService.getBarrageById(siteId).subscribe(
            site => resolve(site),
            error => reject(error)
          );
        });
        
        const roles = await new Promise<Role[]>((resolve, reject) => {
          this.roleService.getAllRoles().subscribe(
            roles => resolve(roles.filter(role => role.designation === 'AdminBAR')),
            error => reject(error)
          );
        });
        console.log("site:",site);
  
        const dialogRef = this.dialog.open(AddUserDialogComponent, {
          width: '700px',
          height: '700px',
          data: { "site": site, "isSite": true, "agence":site.agence,"role": roles,"isAdmin":false}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'userCreated') {
            this.loadUtilisateurs(); // Manually re fresh the user data
          }
        });
  
      } catch (error) {
        console.error('Error:', error);
      }
    } else if (this.cond == "AG") {
      const agenceId = Number(localStorage.getItem('agenceId'));
  
      try {
        const agence = await new Promise<Agence>((resolve, reject) => {
          this.agenceService.getAgenceById(agenceId).subscribe(
            agence => resolve(agence),
            error => reject(error)
          );
        });
  
        const roles = await new Promise<Role[]>((resolve, reject) => {
          this.roleService.getAllRoles().subscribe(
            roles => resolve(roles.filter(role => role.designation === 'AdminAG')),
            error => reject(error)
          );
        });
  
        const dialogRef = this.dialog.open(AddUserDialogComponent, {
          width: '700px',
          height: '700px',
          data: { "agence": agence, "isSite": false, "role": roles,"isAdmin":true }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'userCreated') {
            this.loadUtilisateurs(); // Manually refresh the user data
          }
        });
  
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  async openEditUserDialog(id : string): Promise<void>  {
    if (this.cond == "BAR") {
      const agenceId = Number(localStorage.getItem('agenceId'));
      try {
        const agence = await new Promise<Agence>((resolve, reject) => {
          this.agenceService.getAgenceById(agenceId).subscribe(
            agence => resolve(agence),
            error => reject(error)
          );
        });
        const sites = await new Promise<Site[]>((resolve, reject) => {
          this.siteService.getAllBarrages().subscribe(
            sites => resolve(sites.filter(site => site.agenceId === agenceId)),
            error => reject(error)
          );
        });
  
        const roles = await new Promise<Role[]>((resolve, reject) => {
          this.roleService.getAllRoles().subscribe(
            roles => resolve(roles.filter(role => role.designation === 'AdminBAR')),
            error => reject(error)
          );
        });
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
          width: '700px',
          height: '700px',
          data: {"userId":id,"isSite": true,"site":sites, "agence":agence,"role": roles,"isAdmin":false}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'userUpdated') {
            this.loadUtilisateurs(); // Manually re fresh the user data
          }
        });
  
      } catch (error) {
        console.error('Error:', error);
      }
  }
    else if (this.cond == "AG") {
      try {
        const roles = await new Promise<Role[]>((resolve, reject) => {
          this.roleService.getAllRoles().subscribe(
            roles => resolve(roles.filter(role => role.designation === 'AdminAG')),
            error => reject(error)
          );
        });

        const dialogRef = this.dialog.open(EditUserDialogComponent, {
          width: '700px',
          height: '700px',
          data: {"userId":id,"isSite": false,"role": roles,"isAdmin":true}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === 'userUpdated') {
            this.loadUtilisateurs(); // Manually re fresh the user data
          }
        });
  
      } catch (error) {
        console.error('Error:', error);
      }
  }

}
  
  loadUtilisateurs(): void {
    const siteId = Number(localStorage.getItem('siteId'));
    const agenceId = Number(localStorage.getItem('agenceId'));
    
    if((this.utilisateurconnecte.role.designation === 'AdminAG'||this.utilisateurconnecte.role.designation === 'Admin') && this.cond === 'BAR'){
    
      this.userService.getAllUtilisateurs().subscribe(
        utilisateurs=> {
          
          this.utilisateurs = utilisateurs.filter(utilisateur => utilisateur.siteId === siteId && utilisateur.role?.designation === 'AdminBAR');
          this.totalNumber=this.utilisateurs.length;
        },
        error => {
          console.error('Error fetching Utilisateurs BAR', error);
        }
      );
    }
    else if(this.utilisateurconnecte.role.designation === 'Admin' && this.cond === 'AG'){
  
      this.userService.getAllUtilisateurs().subscribe(
        utilisateurs=> {
          
          this.utilisateurs = utilisateurs.filter(utilisateur => utilisateur.agenceId === agenceId && utilisateur.role?.designation === 'AdminAG');
          this.totalNumber=this.utilisateurs.length;
        },
        error => {
          console.error('Error fetching Utilisateurs AG', error);
        }
      );
    
  }
}
  getUtilisateur(): void {
    this.utilisateurconnecte=localStorage.getItem('utilisateurconnecte');
    if (this.utilisateurconnecte !== null) {
      this.utilisateurconnecte = JSON.parse(this.utilisateurconnecte);
     
    } else {
      console.log('Erreur.');
    }
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
  showConfirm(id: string): void {
    const result = window.confirm('Are you sure you want to continue?');

    if (result) {
      this.supprimer(id);
      // Perform your action here
    } else {
      // Do nothing
      
    }
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


