import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SociosComponent } from './socios/socios.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: NavigationComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'empresas', component: EmpresasComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'socios', component: SociosComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
