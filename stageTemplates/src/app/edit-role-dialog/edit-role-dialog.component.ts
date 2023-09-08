import { Component,OnInit,Inject } from '@angular/core';
import { RoleService } from '../services/role.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from '../models/role';

@Component({
  selector: 'app-edit-role-dialog',
  templateUrl: './edit-role-dialog.component.html',
  styleUrls: ['./edit-role-dialog.component.css']
})
export class EditRoleDialogComponent implements OnInit{
  role: Role = new Role(0,"",false,false,false,false);
  constructor(private roleService: RoleService,private dialogRef: MatDialogRef<EditRoleDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.getRoleById(this.data.roleId);
  }
  modifier(role:Role):void{
    this.roleService.updateRole(role).subscribe(
      (response: any) => {
        
        this.dialogRef.close('roleUpdated'); 
      },
      (error) => {
        // Handle login error here if necessary
        console.error('Put error:', error);
      }
    );
  }
  getRoleById(id: number): void {
    this.roleService.getRoleById(id).subscribe(
      role => {
        this.role = role;
      },
      error => {
        console.error('Error fetching role', error);
      }
    );
  }
  closeDialog():void{
    this.dialogRef.close();
  }
  
}
