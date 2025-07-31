import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CreditoResponse } from '../models/credito-response.interface';
import { CreditoService } from '../services/credito.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-credito-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credito-detail.component.html'
})
export class CreditoDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(CreditoService);

  credito?: CreditoResponse;
  erro = '';

  ngOnInit(): void {
    const numero = this.route.snapshot.paramMap.get('numeroCredito');
    if (numero) {
      // Usando o novo nome do método
      this.service.buscarCreditoPorNumero(numero).pipe(
        catchError(err => {
          this.erro = 'Erro ao buscar crédito: ' + (err?.message || 'backend offline');
          return of(null);
        })
      ).subscribe((data: CreditoResponse | null) => {
        if (!data) {
          this.erro = 'Crédito não encontrado';
        } else {
          this.credito = data;
        }
      });
    } else {
      this.erro = 'Nenhum número de crédito informado na URL';
    }
  }
}