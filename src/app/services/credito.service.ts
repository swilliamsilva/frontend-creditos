import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreditoResponse } from '../models/credito-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  private baseUrl = 'http://localhost:8080/api/creditos';

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Basic ' + btoa('admin:admin123')
    })
  };

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<CreditoResponse[]> {
    return this.http.get<CreditoResponse[]>(this.baseUrl, this.httpOptions);
  }

  buscarPorNumeroNfse(numeroNfse: string): Observable<CreditoResponse[]> {
    return this.http.get<CreditoResponse[]>(`${this.baseUrl}/nfse/${numeroNfse}`, this.httpOptions);
  }

  buscarPorNumeroCredito(numeroCredito: string): Observable<CreditoResponse> {
    return this.http.get<CreditoResponse>(`${this.baseUrl}/numero/${numeroCredito}`, this.httpOptions);
  }

  // Adicionar métodos com os nomes esperados pelo componente
  getCreditosPorNfse = this.buscarPorNumeroNfse;
  getCreditoPorNumero = this.buscarPorNumeroCredito;
}