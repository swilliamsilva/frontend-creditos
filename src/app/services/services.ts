// src/app/services/credito.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Credito {
  numeroCredito: string;
  numeroNfse: string;
  dataConstituicao: string;
  valorIssqn: number;
  tipoCredito: string;
  simplesNacional: string;
  aliquota: number;
  valorFaturado: number;
  valorDeducao: number;
  baseCalculo: number;
}

@Injectable({ providedIn: 'root' })
export class CreditoService {
  private baseUrl = 'http://localhost:8080/api/creditos';

  constructor(private http: HttpClient) {}

  getCreditosPorNfse(numeroNfse: string): Observable<Credito[]> {
    return this.http.get<Credito[]>(`${this.baseUrl}/${numeroNfse}`);
  }

  getCreditoPorNumero(numeroCredito: string): Observable<Credito> {
    return this.http.get<Credito>(`${this.baseUrl}/credito/${numeroCredito}`);
  }
}