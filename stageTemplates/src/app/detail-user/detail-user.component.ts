import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Utilisateur } from '../models/user';
interface SideNavToggle {
  screenWidth: number;
  collapsed : boolean;
}
@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit{
  utilisateur: Utilisateur | undefined;
  isSideNavCollapsed = false;
  screenWidth = 0;
  constructor(private userService: UserService,private route:ActivatedRoute){}
  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId')!;
    this.getUtilisateurById(userId.toString());
  }
  onToggleSideNav(data:SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    
  }
  getUtilisateurById(id:string): void {
    if (id !== null) {
      // Call the service to fetch user details by ID
      this.userService.getUtilisateurById(id).subscribe(
        utilisateur => {
          this.utilisateur = utilisateur;
          console.log('Utilisateur : ', this.utilisateur);
          // Do any further processing with the fetched user details
        },
        error => {
          console.error('Error fetching user details:', error);
        }
      );
    }
 

  }
}
