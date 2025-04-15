import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';
import { DialogVisualizarComponent } from '../dialog-visualizar/dialog-visualizar.component';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog.component';
import { DialogEditarComponent } from '../dialog-editar/dialog-editar.component';
import { DialogCriarComponent } from '../dialog-criar/dialog-criar.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  standalone: false
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'email', 'acoes'];
  usuarios: any[] = []; // Array para armazenar os dados da API

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }

  // Método executado ao inicializar o componente
  ngOnInit(): void {
    this.carregarUsuarios();
  }

  // Método para carregar os usuários da API
  carregarUsuarios(): void {
    this.apiService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Erro ao carregar usuários:', err);
        this.snackBar.open('Erro ao carregar usuários!', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  // Método para abrir o modal de visualização
  visualizar(usuario: any): void {
    this.dialog.open(DialogVisualizarComponent, {
      width: '400px',
      data: usuario,
    });
  }

  // Método para deletar um usuário
  deletar(usuario: any): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '300px',
      data: { message: `Tem certeza que deseja deletar ${usuario.nome}?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService.deleteUsuario(usuario.id).subscribe({
          next: () => {
            this.snackBar.open('Usuário deletado com sucesso!', 'Fechar', {
              duration: 3000,
            });
            this.carregarUsuarios(); // Recarrega a tabela após deletar
          },
          error: (err) => {
            console.error('Erro ao deletar usuário:', err);
            this.snackBar.open('Erro ao deletar usuário!', 'Fechar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  editar(usuario: any): void {
    const dialogRef = this.dialog.open(DialogEditarComponent, {
      width: '400px',
      data: { ...usuario, roles: usuario.roles[0] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarUsuarios(); // Recarrega a tabela com os dados da API
        this.snackBar.open('Usuário atualizado com sucesso!', 'Fechar', { duration: 3000 });
      }
    });
  }

  criar(): void {
    const dialogRef = this.dialog.open(DialogCriarComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarios = [...this.usuarios, result]; // Adiciona o novo usuário
        this.carregarUsuarios(); // Recarrega a tabela com os dados da API
        this.snackBar.open('Usuário adicionado com sucesso!', 'Fechar', { duration: 3000 });
      }
    });
  }




}
