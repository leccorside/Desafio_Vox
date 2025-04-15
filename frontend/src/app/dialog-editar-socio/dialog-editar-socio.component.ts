import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-editar-socio',
  standalone: false,
  templateUrl: './dialog-editar-socio.component.html',
  styleUrl: './dialog-editar-socio.component.css'
})
export class DialogEditarSocioComponent {

  empresas: any;

  compararEmpresas(empresa1: any, empresa2: any): boolean {
    return empresa1 && empresa2 ? empresa1.id === empresa2.id : empresa1 === empresa2;
  }


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogEditarSocioComponent>,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.apiService.getEmpresas().subscribe({
      next: (data) => {
        this.empresas = data;
      },
      error: (err) => {
        console.error('Erro ao carregar empresas:', err);
        this.snackBar.open('Erro ao carregar empresas!', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }


  salvar(): void {
    const dadosAtualizados = {
      nome: this.data.nome,
      cpf: this.data.cpf,
      empresa: this.data.empresa.id, // Certifique-se de enviar apenas o ID da empresa
    };

    this.apiService.updateSocio(this.data.id, dadosAtualizados).subscribe({
      next: (response) => {
        this.snackBar.open('Sócio atualizado com sucesso!', 'Fechar', { duration: 3000 });
        this.dialogRef.close(response);
      },
      error: (err) => {
        console.error('Erro ao atualizar sócio:', err);
        this.snackBar.open('Erro ao atualizar o sócio!', 'Fechar', { duration: 3000 });
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
