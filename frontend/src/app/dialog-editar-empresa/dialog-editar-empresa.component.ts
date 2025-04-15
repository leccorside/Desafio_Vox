import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-editar-empresa',
  standalone: false,
  templateUrl: './dialog-editar-empresa.component.html',
  styleUrl: './dialog-editar-empresa.component.css'
})
export class DialogEditarEmpresaComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogEditarEmpresaComponent>,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  salvar(): void {
    this.apiService.updateEmpresa(this.data.id, this.data).subscribe({
      next: (response) => {
        this.snackBar.open('Empresa atualizada com sucesso!', 'Fechar', { duration: 3000 });
        this.dialogRef.close(response); // Retorna os dados atualizados ao pai
      },
      error: (err) => {
        console.error('Erro ao atualizar empresa:', err);
        this.snackBar.open('Erro ao atualizar a empresa!', 'Fechar', { duration: 3000 });
      },
    });
  }

  fechar(): void {
    this.dialogRef.close();
  }

  apenasNumeros(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

}
