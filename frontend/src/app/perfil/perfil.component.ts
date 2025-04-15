import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  nomeUsuario: string | null = '';

  constructor(public sessionService: SessionService) {

  }

  ngOnInit(): void {
    this.sessionService.userName$.subscribe((name) => {
      this.nomeUsuario = this.sessionService.getNome();
    });
  }

}
