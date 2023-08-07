import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListAgenceComponent} from './list-agence/list-agence.component';
import { ListBarrageComponent } from './list-barrage/list-barrage.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'listAgence', component:ListAgenceComponent},
  {path:'listBarrage', component:ListBarrageComponent},
  {path: 'listBarrage/:agenceId', component: ListBarrageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
