import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-criar',
  templateUrl: './dialog-criar.component.html',
  styleUrls: ['./dialog-criar.component.css'],
  standalone: false,
})
export class DialogCriarComponent {
  data = {
    nome: '',
    email: '',
    senha: '',
    roles: 'ROLE_USER', // Valor padrão para roles
  };
  rolesDisponiveis = ['ROLE_ADMIN', 'ROLE_USER'];

  constructor(
    private dialogRef: MatDialogRef<DialogCriarComponent>,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  salvar(): void {
    this.apiService.createUsuario(this.data).subscribe({
      next: (response) => {
        this.snackBar.open('Usuário criado com sucesso!', 'Fechar', { duration: 3000 });
        this.dialogRef.close(response); // Fecha o diálogo e retorna os dados criados
      },
      error: (err) => {
        console.error('Erro ao criar usuário:', err);
        this.snackBar.open('Erro ao criar o usuário!', 'Fechar', { duration: 3000 });
      },
    });
  }
}
