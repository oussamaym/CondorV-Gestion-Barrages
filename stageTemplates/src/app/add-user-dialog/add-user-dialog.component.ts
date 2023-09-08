import { Component , OnInit ,Inject} from '@angular/core';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role';
import { Site } from '../models/site';
import { Agence } from '../models/agence';
import { SiteService } from '../services/site.service';
import { AgenceService } from '../services/agence.service';
import { Utilisateur } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit{
   cond: any;
   roles: Role[] = [];
   sites: Site[] =[];
   agences: Agence[] = [];
   user: Utilisateur =  new Utilisateur('', '', '', '', null, '', false, 0, 0, 0);
  constructor(private roleService: RoleService,private siteService: SiteService,private agenceService: AgenceService,private userService: UserService,private router: Router, private dialogRef: MatDialogRef<AddUserDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    if(this.data.isSite==true&&this.data.isAdmin==false)
    {
    this.roles= this.data.role;
    this.sites.push(this.data.site);
    this.agences.push(this.data.agence);
    this.user.siteId=this.data.site.id;
    this.user.agenceId=this.data.agence.id;
    this.user.roleId=this.data.role[0].id;
    }
    else if(this.data.isSite==false&&this.data.isAdmin==true)
    {
      this.roles= this.data.role;
      this.sites.push(new Site(0,'Tous les sites','',0,'','',0,0,'',null,'',0));
      this.agences.push(new Agence(this.data.agence.id,this.data.agence.nom,this.data));
      this.user.siteId=this.sites[0].id;
      this.user.agenceId=this.data.agence.id;
      this.user.roleId=this.data.role[0].id;
  }
  else if(this.data.isAdmin==true)
  {
    this.cond="admin";
    this.loadRoles();
    this.loadAgences();
    this.loadBarrages();
  }
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
  
  loadAgences(): void {
    this.agenceService.getAllAgences().subscribe(
      agences => {
        this.agences = agences;
        if (this.agences.length > 0) {
          this.user.agenceId = this.agences[0].id;
        }
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
        if (this.sites.length > 0) {
          this.user.siteId = this.sites[0].id;
        }
      },
      error => {
        console.error('Error fetching Barrages:', error);
      }
    );
  }
  closeDialog():void{
    this.dialogRef.close();
  }
}
