import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
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
  // Injeção correta de todas as dependências
  private route = inject(ActivatedRoute);
  private service = inject(CreditoService);
  private location = inject(Location);  // Corrigido aqui

  credito?: CreditoResponse;
  erro = '';
  
  voltar(): void {
    this.location.back();
  }

  ngOnInit(): void {
    const numero = this.route.snapshot.paramMap.get('numeroCredito');
    if (numero) {
      this.service.buscarCreditoPorNumero(numero).pipe(
        catchError(err => {
          // Mensagem de erro aprimorada
          let errorMessage = 'Erro ao buscar crédito: ';
          
          if (err.status === 0) {
            errorMessage += 'Servidor offline. Tente novamente mais tarde.';
          } else if (err.status === 404) {
            errorMessage += 'Crédito não encontrado.';
          } else {
            errorMessage += err.message || 'Erro desconhecido';
          }
          
          this.erro = errorMessage;
          return of(null);
        })
      ).subscribe((data: CreditoResponse | null) => {
        if (!data) {
          if (!this.erro) this.erro = 'Crédito não encontrado';
        } else {
          this.credito = data;
        }
      });
    } else {
      this.erro = 'Nenhum número de crédito informado na URL';
    }
  }
}