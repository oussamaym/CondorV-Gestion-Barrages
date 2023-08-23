import { Component , OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role';
import { Site } from '../models/site';
import { Agence } from '../models/agence';
import { SiteService } from '../services/site.service';
import { AgenceService } from '../services/agence.service';
import { Utilisateur } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit{
   roles: Role[] = [];
   sites: Site[] = [];
   agences: Agence[] = [];
   user: Utilisateur =  new Utilisateur('', '', '', '', null, '', false, 0, 0, 0);
  constructor(private roleService: RoleService,private siteService: SiteService,private agenceService: AgenceService,private userService: UserService,private router: Router, private dialogRef: MatDialogRef<AddUserDialogComponent>) {
 
   }
  ngOnInit(): void {
    this.loadRoles();
    this.loadAgences();
    this.loadBarrages();
   
  }

  isActive: boolean = true; 
  
  loadRoles(): void {
    this.roleService.getAllRoles().subscribe(
      roles => {
        this.roles = roles;
        if (this.roles.length > 0) {
          this.user.roleId = this.roles[0].id;
        }
      },
      error => {
        console.error('Error fetching Roles', error);
      }
    );
  }
  ajouter(user: Utilisateur):void{
    var PostModel = user;
    this.userService.createUtilisateur(PostModel).subscribe(
      (response: any) => {
        console.log(response)
        this.dialogRef.close('userCreated'); 
      },
      (error) => {
        // Handle login error here if necessary
        console.error('Post error:', error);
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
}
