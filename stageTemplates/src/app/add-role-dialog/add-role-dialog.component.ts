import { Component,OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Role } from '../models/role';

@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.css']
})
export class AddRoleDialogComponent implements OnInit{
  role: Role= new Role(0,"",false,false,false,false);
constructor(private roleService: RoleService,private dialogRef: MatDialogRef<AddRoleDialogComponent>){}
ngOnInit(): void {
  
}
ajouter(role:Role):void{
  this.roleService.createRole(role).subscribe(
    result=>{
      this.dialogRef.close('roleCreated');
    },
    error=>{
      console.error('Error creating role!', error);
    }
  );
}
checkAllRoles() {
  if (this.role.controlTotal) {
    this.role.creer = true;
    this.role.modifier = true;
    this.role.supprimer = true;
    this.role.lecture = true;
  } else {
    // If "Control Total" is unchecked, uncheck all other checkboxes
    this.role.creer = false;
    this.role.modifier = false;
    this.role.supprimer = false;
    this.role.lecture = false;
  }
}







closeDialog(): void {
  this.dialogRef.close();
}
}
