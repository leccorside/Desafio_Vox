import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SociosComponent } from './socios/socios.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogVisualizarComponent } from './dialog-visualizar/dialog-visualizar.component';
import { MatCardModule } from '@angular/material/card';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { DialogEditarComponent } from './dialog-editar/dialog-editar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { DialogCriarComponent } from './dialog-criar/dialog-criar.component';
import { DialogVisualizarEmpresaComponent } from './dialog-visualizar-empresa/dialog-visualizar-empresa.component';
import { DialogEditarEmpresaComponent } from './dialog-editar-empresa/dialog-editar-empresa.component';
import { DialogCriarEmpresaComponent } from './dialog-criar-empresa/dialog-criar-empresa.component';
import { DialogVisualizarSocioComponent } from './dialog-visualizar-socio/dialog-visualizar-socio.component';
import { DialogEditarSocioComponent } from './dialog-editar-socio/dialog-editar-socio.component';
import { DialogCriarSocioComponent } from './dialog-criar-socio/dialog-criar-socio.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    SociosComponent,
    EmpresasComponent,
    DialogVisualizarComponent,
    ConfirmDialog,
    NavigationComponent,
    DashboardComponent,
    DialogEditarComponent,
    DialogCriarComponent,
    DialogVisualizarEmpresaComponent,
    DialogEditarEmpresaComponent,
    DialogCriarEmpresaComponent,
    DialogVisualizarSocioComponent,
    DialogEditarSocioComponent,
    DialogCriarSocioComponent,
    LoginComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
