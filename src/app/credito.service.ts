
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreditoRequest } from '../models/credito-request';
import { CreditoResponse } from '../models/credito-response';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  private apiUrl = 'http://localhost:8080/api/creditos';

  constructor(private http: HttpClient) { }

  getByNfse(numeroNfse: string): Observable<CreditoResponse[]> {
    return this.http.get<CreditoResponse[]>(`${this.apiUrl}/nfse/${numeroNfse}`);
  }

  getByNumeroCredito(numeroCredito: string): Observable<CreditoResponse> {
    return this.http.get<CreditoResponse>(`${this.apiUrl}/numero/${numeroCredito}`);
  }
}