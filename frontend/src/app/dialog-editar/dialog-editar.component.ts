import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-editar',
  templateUrl: './dialog-editar.component.html',
  styleUrls: ['./dialog-editar.component.css'],
  standalone: false
})
export class DialogEditarComponent {
  rolesDisponiveis = ['ROLE_ADMIN', 'ROLE_USER'];

  compararRoles(role1: string, role2: string): boolean {
    return role1 === role2; // Compara os valores como strings
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogEditarComponent>,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  salvar(): void {
    this.apiService.updateUsuario(this.data.id, this.data).subscribe({
      next: (response) => {
        this.snackBar.open('Usuário atualizado com sucesso!', 'Fechar', { duration: 3000 });
        this.dialogRef.close(response); // Retorna os dados atualizados ao pai
      },
      error: (err) => {
        console.error('Erro ao atualizar usuário:', err);
        this.snackBar.open('Erro ao atualizar o usuário!', 'Fechar', { duration: 3000 });
      },
    });
  }

  fechar(): void {
    this.dialogRef.close();
  }

}
