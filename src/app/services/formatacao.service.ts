import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormatacaoService {
  formatarData(data: string): string {
    if (!data) return '-';
    try {
      return new Date(data).toLocaleDateString('pt-BR');
    } catch {
      return data;
    }
  }

  formatarMoeda(valor: number): string {
    if (valor == null) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  formatarPorcentagem(valor: number): string {
    if (valor == null) return '0%';
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor / 100);
  }
}