import { Component,OnInit,Inject } from '@angular/core';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleDialogComponent } from '../add-role-dialog/add-role-dialog.component';
import { EditRoleDialogComponent } from '../edit-role-dialog/edit-role-dialog.component';
import { DeletingDialogComponent } from '../deleting-dialog/deleting-dialog.component';
interface AdminSideNavToggle {
  screenWidth: number;
  collapsed : boolean;
}
@Component({
  selector: 'app-crud-role',
  templateUrl: './crud-role.component.html',
  styleUrls: ['./crud-role.component.css']
})
export class CrudRoleComponent  implements OnInit{
  isSideNavCollapsed = false;
  screenWidth = 0;
  roles: Role[] = [];
  itemsPerPage: number=5;
  p:number=1;
  onToggleSideNav(data:AdminSideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  constructor(private roleService: RoleService,private dialog: MatDialog){

  }
  ngOnInit(): void {
    this.getAllRoles();
  }
  getAllRoles():void{
    this.roleService.getAllRoles().subscribe(
      roles=>{
        this.roles=roles;
      },
      error=>{
        console.error('Error fetching Roles:', error);
      }
    );
  }
  
  openEditRoleDialog(id: number): void {
    const dialogRef = this.dialog.open(EditRoleDialogComponent, {
      width: '700px',
      height:'700px',
      data: { roleId: id }
      
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'roleUpdated') {
        this.getAllRoles(); // Manually refresh the user data
      }
    });
  }
  openAddRoleDialog():void{
    const dialogRef = this.dialog.open(AddRoleDialogComponent, {
      width: '700px',
      height: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'roleCreated') {
        this.getAllRoles(); // Manually refresh the user data
      }
    });
  }
  opendelGrDialog(id:number): void {
    const dialogRef = this.dialog.open(DeletingDialogComponent, {
       width: '500px',
       height:'325px',
       data: {"roleId":id}
       
     });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'roleDeleted') {
          this.getAllRoles(); 
        }
      });
  
   }
  }