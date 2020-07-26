import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformeComponent } from './componentes/informe/informe.component';
import { SignupComponent } from './componentes/signup/signup.component';
import { PrivateTasksComponent } from './componentes/private-tasks/private-tasks.component';
import { SigninComponent } from './componentes/signin/signin.component';
import { AuthGuard } from './auth.guard';
import { CommonModule } from '@angular/common'
import { FormInformeAPComponent } from "./componentes/form-informe-ap/form-informe-ap.component";

import { NuevaAuditoriaComponent } from "./componentes/nueva-auditoria/nueva-auditoria.component";

import { AdministracionComponent } from "./componentes/administracion/administracion.component";
import { TEAuditoriasComponent } from './componentes/t-e-auditorias/t-e-auditorias.component';
const routes: Routes = [

  {
    path:"", 
    redirectTo: '/private', pathMatch: 'full'
  },  
  {
    path:"informes", 
    component: InformeComponent,
    canActivate: [AuthGuard]
  },  
  {
    path: 'private',
    component: FormInformeAPComponent, 
    // component: TEAuditoriasComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'administracion',
    component: AdministracionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path:"signup", 
    component: SignupComponent
  },
  {
    path:"nueva_auditoria", 
    component: NuevaAuditoriaComponent,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule,RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
