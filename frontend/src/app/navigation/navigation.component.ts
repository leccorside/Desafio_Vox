import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SessionService } from '../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  standalone: false
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);
  userName: string | null = null;
  isUserLoggedIn: boolean = false;
  nomeUsuario: string | null = '';
  roleUsuario: string | null = '';

  constructor(public sessionService: SessionService, private snackBar: MatSnackBar, public router: Router, private dialog: MatDialog,) {

  }

  ngOnInit(): void {
    this.sessionService.userName$.subscribe((name) => {
      this.userName = name;
      this.isUserLoggedIn = !!name; // Atualiza dinamicamente o status do login
      this.nomeUsuario = this.sessionService.getNome();
      this.roleUsuario = this.sessionService.getUserRole();
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    logout(): void {
      this.sessionService.logout();
      this.snackBar.open('Sessão encerrada com sucesso!', 'Fechar', { duration: 3000 });
      this.router.navigate(['/login']); // Redireciona para a tela de login
      this.isUserLoggedIn = false;
      this.userName = null;
    }

    perfil(): void {
      this.router.navigate(['/perfil']);
    }

    isLoginPage(): boolean {
      return this.router.url === '/login'; // ou inclua outras rotas se quiser esconder em mais de uma
    }

    temPermissaoAdmin(): boolean {
      const roles = this.sessionService.getRoles();
      return roles.includes('ROLE_ADMIN');
    }


}
