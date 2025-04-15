import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-criar-empresa',
  standalone: false,
  templateUrl: './dialog-criar-empresa.component.html',
  styleUrl: './dialog-criar-empresa.component.css'
})
export class DialogCriarEmpresaComponent {
  data = {
    nome: '',
    cnpj: '',
    telefone: '',
    email: '',
  };

  constructor(
    private dialogRef: MatDialogRef<DialogCriarEmpresaComponent>,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  salvar(): void {
    this.apiService.createEmpresa(this.data).subscribe({
      next: (response) => {
        this.snackBar.open('Empresa criada com sucesso!', 'Fechar', { duration: 3000 });
        this.dialogRef.close(response); // Fecha o diálogo e retorna os dados criados
      },
      error: (err) => {
        console.error('Erro ao criar empresa:', err);
        this.snackBar.open('Erro ao criar a empresa!', 'Fechar', { duration: 3000 });
      },
    });
  }

  apenasNumeros(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
