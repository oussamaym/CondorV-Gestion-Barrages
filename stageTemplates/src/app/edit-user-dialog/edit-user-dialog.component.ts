import { Component , OnInit , Inject } from '@angular/core';
import { RoleService } from '../services/role.service';
import { SiteService } from '../services/site.service';
import { AgenceService } from '../services/agence.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Utilisateur } from '../models/user';
import { Role } from '../models/role';
import { Site } from '../models/site';
import { Agence } from '../models/agence';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit{
  user: Utilisateur =  new Utilisateur('', '', '', '', null, '', false, 0, 0, 0);
  roles: Role[] = [];
  sites: Site[] = [];
  agences: Agence[] = [];
 constructor(private roleService: RoleService,private siteService: SiteService,private agenceService: AgenceService,private userService: UserService,private router: Router, private dialogRef: MatDialogRef<EditUserDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
  //console.log('User ID:', this.data.userId);
  }
 ngOnInit(): void {
  this.getUtilisateurById(this.data.userId);
  if(this.data.isSite==true &&this.data.isAdmin==false)
  {
    this.roles= this.data.role;
    this.agences.push(this.data.agence);
    for(let site of this.data.site)
    {
      this.sites.push(site);
    }
    console.log("site : ",this.data.site);
    console.log("site : ",this.sites);
  }
  else if(this.data.isSite==false &&this.data.isAdmin==true)
  {
    this.roles= this.data.role;
    this.sites.push(new Site(0,'Tous les sites','',0,'','',0,0,'',null,'',0));
    this.loadAgences();
  }
  else if(this.data.isAdmin==true)
  {
    this.loadRoles();
    this.loadAgences();
    this.loadBarrages();
  }

 }
 modifier(user: Utilisateur):void{
  var EditedUser = user;
  this.userService.updateUtilisateur(user).subscribe(
    (response: any) => {
      console.log(response)
      this.dialogRef.close('userUpdated'); 
    },
    (error) => {
      // Handle login error here if necessary
      console.error('Post error:', error);
    }
  );
}
 loadRoles(): void {
   this.roleService.getAllRoles().subscribe(
     roles => {
       this.roles = roles;
     },
     error => {
       console.error('Error fetching Roles', error);
     }
   );
 }
 loadAgences(): void {
   this.agenceService.getAllAgences().subscribe(
     agences => {
       this.agences = agences;
     },
     error => {
       console.error('Error fetching Agences:', error);
     }
   );
 }
 loadBarrages(): void {
   this.siteService.getAllBarrages().subscribe(
     sites => {
       this.sites = sites;
     },
     error => {
       console.error('Error fetching Barrages:', error);
     }
   );
 }
 getUtilisateurById(id:string): void {
  if (id !== null) {
    // Call the service to fetch user details by ID
    this.userService.getUtilisateurById(id).subscribe(
      user => {
        this.user = user;
        console.log("user : ",this.user);
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
closeDialog():void{
  this.dialogRef.close();
}
}