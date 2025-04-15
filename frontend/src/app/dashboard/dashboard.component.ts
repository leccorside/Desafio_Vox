import { Component, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SessionService } from '../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: false
})
export class DashboardComponent {

  constructor(public sessionService: SessionService, private snackBar: MatSnackBar, public router: Router) {}


  logout(): void {
    this.sessionService.logout();
    this.snackBar.open('Sessão encerrada com sucesso!', 'Fechar', { duration: 3000 });
    this.router.navigate(['/login']); // Redireciona para a tela de login
  }


}
