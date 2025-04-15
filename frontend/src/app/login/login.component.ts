import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  isUserLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.sessionService.isLoggedIn()) {
      const roles = this.sessionService.getRoles();

      if (roles.length === 0) {
        console.warn('Nenhum papel encontrado para o usuário!');
      }

      if (roles.includes('ROLE_ADMIN')) {
        this.router.navigate(['/usuarios']); // Redireciona para a página de usuários
      } else if (roles.includes('ROLE_USER')) {
        this.router.navigate(['/perfil']); // Redireciona para a página de perfil
      }
    }
  }



  realizarLogin(): void {
    if (!this.email || !this.senha) {
      this.snackBar.open('Preencha todos os campos!', 'Fechar', { duration: 3000 });
      return;
    }

    this.authService.login(this.email, this.senha).subscribe({
      next: (response) => {
        console.log('Dados recebidos do backend:', response);
        this.snackBar.open('Login efetuado com sucesso!', 'Fechar', { duration: 3000 });

        const roles = response.usuario.roles || [];

        this.sessionService.setSession(response.token, response.usuario.nome, roles);

        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/usuarios']);
        } else if (roles.includes('ROLE_USER')) {
          this.router.navigate(['/perfil']);
        } else {
          this.router.navigate(['/']); // Redireciona para rota padrão caso nenhuma role se aplique
        }
      },
      error: (err) => {
        console.error('Erro ao realizar login:', err);
        this.snackBar.open('Credenciais inválidas!', 'Fechar', { duration: 3000 });
      }
    });
  }







}
