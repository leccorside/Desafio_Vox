import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrlUsuarios = 'http://127.0.0.1:8000/api/usuarios';
  private baseUrlEmpresas = 'http://127.0.0.1:8000/api/empresas';
  private baseUrlSocios   = 'http://127.0.0.1:8000/api/socios';

  constructor(private http: HttpClient) {}

  // Método para listar usuários
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrlUsuarios);
  }

  // Método para editar um usuário
  updateUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrlUsuarios}/${id}`, usuario);
  }

  // Método para criar um usuário
  createUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrlUsuarios}`, usuario);
  }

  // Método para deletar um usuário pelo ID
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrlUsuarios}/${id}`);
  }

  /*********************************************************************************************************** */

   // Método para listar empresas
   getEmpresas(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrlEmpresas);
  }

   // Método para editar uma empresa
   updateEmpresa(id: number, empresa: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrlEmpresas}/${id}`, empresa);
  }

  // Método para criar uma empresa
  createEmpresa(empresa: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrlEmpresas}`, empresa);
  }

  // Método para deletar uma empresa pelo ID
  deleteEmpresa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrlEmpresas}/${id}`);
  }

  /*********************************************************************************************************** */

  // Método para listar sócios
  getSocios(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrlSocios);
  }

   // Método para editar um sócio
   updateSocio(id: number, socio: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrlSocios}/${id}`, socio);
  }

  // Método para criar um sócio

  createSocio(socio: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/socios', socio); // Chamada ao endpoint do backend
  }

  // Método para deletar um sócio pelo ID
  deletesocio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrlSocios}/${id}`);
  }
}
