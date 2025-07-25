import { Component } from '@angular/core';
import { Component } from '@angular/core';
import { CreditoService } from '../../services/credito.service';
import { CreditoResponse } from '../../models/credito-response';
@Component({
  selector: 'app-credito-list',
  imports: [],
  templateUrl: './credito-list.html',
  styleUrl: './credito-list.css'
})

export class CreditoList {
  creditos: CreditoResponse[] = [];

  constructor(private creditoService: CreditoService) {}

  buscarPorNfse(nfse: string) {
    this.creditoService.getByNfse(nfse).subscribe({
      next: (data) => this.creditos = data,
      error: (err) => console.error('Erro ao buscar créditos', err)
    });
  }
}