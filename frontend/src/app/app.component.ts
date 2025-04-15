import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  constructor(public router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login'; // ou inclua outras rotas se quiser esconder em mais de uma
  }

}
