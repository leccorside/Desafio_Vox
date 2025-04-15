import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/login'; // URL do backend

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    const payload = { email, senha };
    return this.http.post<any>(this.apiUrl, payload); // Faz a requisição POST
  }
}
