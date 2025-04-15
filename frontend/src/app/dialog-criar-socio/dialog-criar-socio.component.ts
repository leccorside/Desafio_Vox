import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-criar-socio',
  standalone: false,
  templateUrl: './dialog-criar-socio.component.html',
  styleUrls: ['./dialog-criar-socio.component.css']
})
export class DialogCriarSocioComponent {

  empresas: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<DialogCriarSocioComponent>,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {
      nome: string;
      cpf: string;
      empresa: {
        id: number;
        nome: string;
        cnpj?: string;
        telefone?: string;
        email?: string;
        createdAt?: string;
        updatedAt?: string;
      };
    }
  ) {}

  ngOnInit(): void {
    // Carregamento das empresas disponíveis
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
    // Verificação adicional
    if (!this.data || !this.data.empresa || !this.data.empresa.id) {
      this.snackBar.open('Dados incompletos para criar o sócio!', 'Fechar', { duration: 3000 });
      console.log(this.data.empresa.id);
      return;
    }

    // Estrutura do payload para criação
    const socio = {
      nome: this.data.nome,
      cpf: this.data.cpf,
      empresa: this.data.empresa.id // Envia apenas o ID da empresa
    };

    console.log('Payload enviado:', socio); // Para depuração

    // Chama o método do serviço para criar o sócio
    this.apiService.createSocio(socio).subscribe({
      next: (response) => {
        this.snackBar.open('Sócio criado com sucesso!', 'Fechar', { duration: 3000 });
        this.dialogRef.close(response); // Fecha o diálogo e retorna a resposta criada
      },
      error: (err) => {
        console.error('Erro ao criar sócio:', err);
        this.snackBar.open('Erro ao criar o sócio!', 'Fechar', { duration: 3000 });
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
