import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListAgenceComponent} from './list-agence/list-agence.component';
import { ListBarrageComponent } from './list-barrage/list-barrage.component';
import { CrudUserComponent } from './crud-user/crud-user.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SettingsComponent } from './settings/settings.component';
import { DetailBarrageComponent } from './detail-barrage/detail-barrage.component';
import { DetailUserComponent } from './detail-user/detail-user.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'listAgence', component:ListAgenceComponent},
  {path:'listBarrage', component:ListBarrageComponent},
  {path: 'listBarrage/:agenceId', component: ListBarrageComponent },
  {path:'crudUser', component:CrudUserComponent},
  {path:'navside', component:SidenavComponent},
  {path:'settings', component:SettingsComponent},
  {path:'detailBarrage', component:DetailBarrageComponent},
  {path:'detailUser' , component:DetailUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
