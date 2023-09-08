import { Component,OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SiteService } from '../services/site.service';
import { AgenceService } from '../services/agence.service';
import { GrandeurService } from '../services/grandeur.service';
import { TypeGrandeurService } from '../services/typegrandeur.service';
import { RoleService } from '../services/role.service';
import { SiteGrandeurService } from '../services/sitegrandeur.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-deleting-dialog',
  templateUrl: './deleting-dialog.component.html',
  styleUrls: ['./deleting-dialog.component.css']
})
export class DeletingDialogComponent implements OnInit {
  isConfirmed: boolean=false;
  constructor(private dialogRef: MatDialogRef<DeletingDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private userService: UserService, private siteService: SiteService,private agenceService: AgenceService,private grandeurService: GrandeurService,private typeGrandeurService: TypeGrandeurService,private roleService: RoleService,private siteGrandeurService: SiteGrandeurService) { }
  ngOnInit(): void {
  }
  supprimer():void
  {
  if(this.data.grandeurId !== undefined)
  {
    this.grandeurService.deleteGrandeur(this.data.grandeurId).subscribe(
      (response: any) => {
        this.dialogRef.close('grandeurDeleted'); 
      },
      (error) => {
        console.error('Delete grandeur error:', error);
      }
    );
  }
  else if(this.data.siteId !== undefined)
  {
    this.siteService.deleteBarrage(this.data.siteId).subscribe(
      (response: any) => {
        this.dialogRef.close('siteDeleted'); 
      },
      (error) => {
        console.error('Delete site error:', error);
      }
    );
  }
  else if(this.data.agenceId !== undefined)
  {
    this.agenceService.deleteAgence(this.data.agenceId).subscribe(
      (response: any) => {
        this.dialogRef.close('agenceDeleted'); 
      },
      (error) => {
        console.error('Delete agence error:', error);
      }
    );
  }
  else if(this.data.typeGrandeurId !== undefined)
  {
    this.typeGrandeurService.deleteTypeGrandeur(this.data.typeGrandeurId).subscribe(
      (response: any) => {
        this.dialogRef.close('typeGrandeurDeleted'); 
      },
      (error) => {
        console.error('Delete typeGrandeur error:', error);
      }
    );
  }
  else if(this.data.roleId !== undefined)
  {
    this.roleService.deleteRole(this.data.roleId).subscribe(
      (response: any) => {
        this.dialogRef.close('roleDeleted'); 
      },
      (error) => {
        console.error('Delete role error:', error);
      }
    );
  }
  else if(this.data.siteGrandeurSiteId !== undefined && this.data.siteGrandeurtypeGrandeurId !== undefined)
  {
    this.siteGrandeurService.deleteSiteGrandeur(this.data.siteGrandeurSiteId,this.data.siteGrandeurtypeGrandeurId ).subscribe(
      (response: any) => {
        this.dialogRef.close('siteGrandeurDeleted'); 
      },
      (error) => {
        console.error('Delete siteGrandeur error:', error);
      }
    );
    this.grandeurService.deleteGrandeur(this.data.grandeurId).subscribe(
      (response: any) => {
        this.dialogRef.close('grandeurDeleted'); 
      },
      (error) => {
        console.error('Delete grandeur error:', error);
      }
    );
  }
  else if(this.data.utilisateurId !== undefined)
  {
    this.userService.deleteUtilisateur(this.data.utilisateurId).subscribe(
      (response: any) => {
        this.dialogRef.close('utilisateurDeleted'); 
      },
      (error) => {
        console.error('Delete utilisateur error:', error);
      }
    );
  }
  }
  closeDialog():void{
    this.dialogRef.close();
  }
}
