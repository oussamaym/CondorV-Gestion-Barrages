import { Component , OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { SiteIdService } from '../services/site-id.service';
import { Utilisateur } from '../models/user';
import { UserService } from '../services/user.service';

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
  UserService: any;
  onToggleSideNav(data:SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    
  }

  constructor(public dialog: MatDialog,private siteIdService: SiteIdService,private userService: UserService) {}
  ngOnInit(): void {
    this.loadUtilisateurs();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '700px',
      height:'700px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'userCreated') {
        this.loadUtilisateurs(); // Manually refresh the user data
      }
    });
  }
  
  loadUtilisateurs(): void {
    const siteId = Number(localStorage.getItem('siteId'));
    console.log(siteId);
    
    this.userService.getAllUtilisateurs().subscribe(
      utilisateurs=> {
        
        this.utilisateurs = utilisateurs.filter(utilisateur => utilisateur.siteId === siteId);
        console.log(this.utilisateurs);
      },
      error => {
        console.error('Error fetching Utilisateurs:', error);
      }
    );
    
  }
  
}