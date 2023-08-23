import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListAgenceComponent} from './list-agence/list-agence.component';
import { ListSiteComponent } from './list-sites/list-sites.component';
import { CrudUserComponent } from './crud-user/crud-user.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SettingsComponent } from './settings/settings.component';
import { DetailBarrageComponent } from './detail-barrage/detail-barrage.component';
import { DetailUserComponent } from './detail-user/detail-user.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'listAgences', component:ListAgenceComponent},
  {path:'listSites', component:ListSiteComponent},
  {path: 'listSites/:agenceId', component: ListSiteComponent },
  {path:'crudUser', component:CrudUserComponent},
  { path: 'detailUser/:userId', component: DetailUserComponent },
  {path:'navside', component:SidenavComponent},
  {path:'settings', component:SettingsComponent},
  {path:'detailBarrage', component:DetailBarrageComponent},
  {path:'detailBarrage/:siteId', component:DetailBarrageComponent},
  {path:'detailUser' , component:DetailUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
