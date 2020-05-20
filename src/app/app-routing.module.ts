import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {AcasaComponent} from './biblioteca/acasa/acasa.component';
import {ImprumutComponent} from './biblioteca/imprumut/imprumut.component';
import {ListaComponent} from './biblioteca/lista/lista.component';
import {ContactComponent} from './biblioteca/contact/contact.component';
import {AcasaAdminComponent} from './admin/acasa-admin/acasa-admin.component';
import {ModifCartiComponent} from "./admin/modif-carti/modif-carti.component";
import {ModifImprumutComponent} from "./admin/modif-imprumut/modif-imprumut.component";


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'acasa', component: AcasaComponent},
  {path: 'imprumuta',  component: ImprumutComponent},
  {path: 'listaMea', component: ListaComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'acasaAdmin', component: AcasaAdminComponent},
  {path: 'modifCarti', component: ModifCartiComponent},
  {path: 'modifImprumut', component: ModifImprumutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
