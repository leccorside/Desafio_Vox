import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private tokenKey: string = 'authToken';
  private userNameKey: string = 'userName';
  private userRolesKey: string = 'userRoles';

  // BehaviorSubject para observar o nome do usuário
  private userNameSubject = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSubject.asObservable();

  // Atualiza a sessão do usuário, incluindo nome, token e roles
  setSession(token: string, nome: string, roles: string[]): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userNameKey, nome);

    if (roles && Array.isArray(roles) && roles.length > 0) {
      localStorage.setItem(this.userRolesKey, JSON.stringify(roles)); // Salva as roles corretamente
    } else {
      console.warn('Nenhuma role válida encontrada para salvar na sessão:', roles);
      localStorage.setItem(this.userRolesKey, JSON.stringify([])); // Salva array vazio
    }

    this.userNameSubject.next(nome); // Atualiza dinamicamente o nome do usuário
  }



  // Verifica se o usuário está logado
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // Obtém os papéis do usuário
  getRoles(): string[] {
    const roles = localStorage.getItem(this.userRolesKey);

    if (!roles) {
      console.warn('A chave userRolesKey está ausente no localStorage!');
      return []; // Retorna array vazio se a chave não existir
    }

    try {
      const parsedRoles = JSON.parse(roles); // Tenta parsear o JSON
      if (Array.isArray(parsedRoles)) {
        return parsedRoles; // Retorna os papéis válidos
      } else {
        console.error('Os papéis no localStorage não são um array:', parsedRoles);
        return [];
      }
    } catch (error) {
      console.error('Erro ao fazer o parse dos papéis no localStorage:', error);
      return []; // Retorna array vazio em caso de erro no parse
    }
  }




  // Obtém o nome do usuário
  getUserRole(): string | null {
    return localStorage.getItem(this.userRolesKey);
  }

  getNome(): string | null {
    return localStorage.getItem(this.userNameKey);
  }

  // Faz o logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userNameKey);
    localStorage.removeItem(this.userRolesKey); // Remove os papéis também
    this.userNameSubject.next(null); // Limpa o BehaviorSubject
  }
}
