import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog.component';
import { DialogVisualizarEmpresaComponent } from '../dialog-visualizar-empresa/dialog-visualizar-empresa.component';
import { DialogEditarEmpresaComponent } from '../dialog-editar-empresa/dialog-editar-empresa.component';
import { DialogCriarEmpresaComponent } from '../dialog-criar-empresa/dialog-criar-empresa.component';

@Component({
  selector: 'app-empresas',
  standalone: false,
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css'
})
export class EmpresasComponent {
  displayedColumns: string[] = ['id', 'nome', 'cnpj', 'acoes'];
  empresas: any[] = []; // Array para armazenar os dados da API

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }

  // Método executado ao inicializar o componente
  ngOnInit(): void {
    this.carregarEmpresas();
  }

  // Método para carregar os usuários da API
  carregarEmpresas(): void {
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

  // Método para abrir o modal de visualização
  visualizar(empresa: any): void {
    this.dialog.open(DialogVisualizarEmpresaComponent, {
      width: '400px',
      data: empresa,
    });
  }

  // Método para deletar um usuário
  deletar(empresa: any): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '300px',
      data: { message: `Tem certeza que deseja deletar ${empresa.nome}?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.deleteEmpresa(empresa.id).subscribe({
          next: () => {
            this.snackBar.open('Empresa deletada com sucesso!', 'Fechar', {
              duration: 3000,
            });
            this.carregarEmpresas(); // Recarrega a tabela após deletar
          },
          error: (err) => {
            console.error('Erro ao deletar empresa:', err);
            this.snackBar.open('Erro ao deletar empresa!', 'Fechar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  editar(empresa: any): void {
    const dialogRef = this.dialog.open(DialogEditarEmpresaComponent, {
      width: '400px',
      data: empresa
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarEmpresas(); // Recarrega a tabela com os dados da API
        this.snackBar.open('Empresa atualizada com sucesso!', 'Fechar', { duration: 3000 });
      }
    });
  }

  criar(): void {
    const dialogRef = this.dialog.open(DialogCriarEmpresaComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.empresas = [...this.empresas, result]; // Adiciona a nova empresa
        this.carregarEmpresas(); // Recarrega a tabela com os dados da API
        this.snackBar.open('Empresa adicionada com sucesso!', 'Fechar', { duration: 3000 });
      }
    });
  }




}
