import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog.component';
import { DialogVisualizarSocioComponent } from '../dialog-visualizar-socio/dialog-visualizar-socio.component';
import { DialogEditarSocioComponent } from '../dialog-editar-socio/dialog-editar-socio.component';
import { DialogCriarSocioComponent } from '../dialog-criar-socio/dialog-criar-socio.component';

@Component({
  selector: 'app-socios',
  standalone: false,
  templateUrl: './socios.component.html',
  styleUrl: './socios.component.css'
})
export class SociosComponent {
  displayedColumns: string[] = ['id', 'nome', 'empresa', 'acoes'];
  socios: any[] = []; // Array para armazenar os dados da API

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }

  // Método executado ao inicializar o componente
  ngOnInit(): void {
    this.carregarSocios();
  }

  // Método para carregar os usuários da API
  carregarSocios(): void {
    this.apiService.getSocios().subscribe({
      next: (data) => {
        this.socios = data;
      },
      error: (err) => {
        console.error('Erro ao carregar sócios:', err);
        this.snackBar.open('Erro ao carregar sócios!', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  // Método para abrir o modal de visualização
  visualizar(socio: any): void {
    this.dialog.open(DialogVisualizarSocioComponent, {
      width: '400px',
      data: socio,
    });
  }

  // Método para deletar um usuário
  deletar(socio: any): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '300px',
      data: { message: `Tem certeza que deseja deletar ${socio.nome}?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.deletesocio(socio.id).subscribe({
          next: () => {
            this.snackBar.open('Sócio deletado com sucesso!', 'Fechar', {
              duration: 3000,
            });
            this.carregarSocios(); // Recarrega a tabela após deletar
          },
          error: (err) => {
            console.error('Erro ao deletar sócio:', err);
            this.snackBar.open('Erro ao deletar sócio!', 'Fechar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  editar(socio: any): void {
    const dialogRef = this.dialog.open(DialogEditarSocioComponent, {
      width: '400px',
      data: socio
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarSocios(); // Recarrega a tabela com os dados da API
        this.snackBar.open('Sócio atualizado com sucesso!', 'Fechar', { duration: 3000 });
      }
    });
  }

  criar(): void {
    const dialogRef = this.dialog.open(DialogCriarSocioComponent, {
      width: '400px',
      data: {
        nome: '',
        cpf: '',
        empresa: null // Inicia sem empresa selecionada
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.socios = [...this.socios, result]; // Adiciona o novo usuário
        this.carregarSocios(); // Recarrega a tabela com os dados da API
        this.snackBar.open('Sócio adicionado com sucesso!', 'Fechar', { duration: 3000 });
      }
    });
  }




}
