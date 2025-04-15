import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SessionService } from './services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.sessionService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRoles = route.data['roles'] as string[];
    const userRoles = this.sessionService.getRoles();

    if (expectedRoles && !userRoles.some(role => expectedRoles.includes(role))) {
      this.router.navigate(['/perfil']); // ou outra rota de acesso negado
      return false;
    }

    return true;
  }
}
