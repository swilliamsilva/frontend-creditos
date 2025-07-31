import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreditoResponse } from '../models/credito-response.interface';
import { environment } from '../core/environments/environment'; // Caminho corrigido

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  private apiUrl = environment.apiUrl;
  private username = environment.apiUsername;
  private password = environment.apiPassword;

  constructor(private http: HttpClient) {}

  private getAuthHeader(): HttpHeaders {
    if (this.username && this.password) {
      const authToken = btoa(`${this.username}:${this.password}`);
      return new HttpHeaders({
        'Authorization': `Basic ${authToken}`
      });
    }
    return new HttpHeaders();
  }

  buscarCreditosPorNfse(numeroNfse: string): Observable<CreditoResponse[]> {
    const headers = this.getAuthHeader();
    return this.http.get<CreditoResponse[]>(
      `${this.apiUrl}/creditos/nfse/${numeroNfse}`,
      { headers }
    ).pipe(
      catchError(() => of([]))
    );
  }

  buscarCreditoPorNumero(numeroCredito: string): Observable<CreditoResponse | null> {
    const headers = this.getAuthHeader();
    return this.http.get<CreditoResponse>(
      `${this.apiUrl}/creditos/numero/${numeroCredito}`,
      { headers }
    ).pipe(
      catchError(() => of(null))
    );
  }

  // Adicione este método para compatibilidade
  buscarPorNumeroCredito(numeroCredito: string): Observable<CreditoResponse | null> {
    return this.buscarCreditoPorNumero(numeroCredito);
  }
}