// consulta-state.services.ts
import { Injectable, signal } from '@angular/core';
import { CreditoResponse } from '../models/credito-response.interface';

@Injectable({ providedIn: 'root' })
export class ConsultaStateService {
  tipoConsulta = signal<'todos' | 'nfse' | 'credito'>('todos');
  termoBusca = signal('');
  creditos = signal<CreditoResponse[]>([]);
  carregando = signal(false);
  erro = signal('');
  consultaRealizada = signal(false);

  limparResultados(): void {
    this.creditos.set([]);
    this.erro.set('');
    this.consultaRealizada.set(false);
    this.termoBusca.set('');
    this.carregando.set(false); // Adicione esta linha
  }
}