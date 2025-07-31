import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreditoListComponent } from '../credito-list/credito-list.component';
import { CreditoService } from '../services/credito.service';
import { ConsultaStateService } from '../services/consulta-state.service';
import { CreditoResponse } from '../models/credito-response.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-credito-consulta',
  standalone: true,
  templateUrl: './credito-consulta.component.html',
  imports: [CommonModule, FormsModule, CreditoListComponent, RouterModule]
})
export class CreditoConsultaComponent implements OnInit {
  private creditoService = inject(CreditoService);
  private state = inject(ConsultaStateService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  numeroNfse = '';
  numeroCredito = '';
  carregando = false;

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('numeroCredito');
    if (param) {
      this.numeroCredito = param;
      this.consultarPorNumeroCredito();
    } else {
      setTimeout(() => {
        const numero = prompt('Informe o número do Crédito ou da NFSe:');
        if (numero) {
          if (!isNaN(Number(numero))) {
            this.numeroCredito = numero;
            this.consultarPorNumeroCredito();
          } else {
            this.numeroNfse = numero;
            this.consultarPorNfse();
          }
        }
      }, 100);
    }
  }

  get creditos() {
    return this.state.creditos();
  }

  get erro() {
    return this.state.erro();
  }

  get consultaRealizada() {
    return this.state.consultaRealizada();
  }

  get isCarregando() {
    return this.state.carregando();
  }

  consultar(): void {
    if (this.numeroCredito.trim()) {
      this.consultarPorNumeroCredito();
    } else if (this.numeroNfse.trim()) {
      this.consultarPorNfse();
    } else {
      this.state.erro.set('Preencha um número para consultar.');
      this.state.creditos.set([]);
    }
  }

  consultarPorNfse(): void {
    this.state.carregando.set(true);
    this.state.erro.set('');
    this.state.consultaRealizada.set(false);
    this.state.tipoConsulta.set('nfse');
    this.state.termoBusca.set(this.numeroNfse);

    this.creditoService.getCreditosPorNfse(this.numeroNfse).pipe(
      catchError(err => {
        this.state.erro.set('Erro ao consultar NFSe: ' + (err?.message || 'Backend indisponível.'));
        this.state.creditos.set([]);
        return of([]);
      })
    ).subscribe((data: CreditoResponse[]) => {
      this.state.creditos.set(data);
      this.state.consultaRealizada.set(true);
      if (!data.length) {
        this.state.erro.set('Nenhum crédito encontrado para esta NFSe.');
      }
      this.state.carregando.set(false);
    });
  }

  consultarPorNumeroCredito(): void {
    this.state.carregando.set(true);
    this.state.erro.set('');
    this.state.consultaRealizada.set(false);
    this.state.tipoConsulta.set('credito');
    this.state.termoBusca.set(this.numeroCredito);

    this.creditoService.getCreditoPorNumero(this.numeroCredito).pipe(
      catchError(err => {
        this.state.erro.set('Erro ao consultar crédito: ' + (err?.message || 'Backend indisponível.'));
        this.state.creditos.set([]);
        return of(null);
      })
    ).subscribe((data: CreditoResponse | null) => {
      this.state.creditos.set(data ? [data] : []);
      this.state.consultaRealizada.set(true);
      if (!data) {
        this.state.erro.set('Crédito não encontrado.');
      }
      this.state.carregando.set(false);
    });
  }

  onSelecionar(c: CreditoResponse) {
    if (!c || !c.numeroCredito) {
      this.state.erro.set('Crédito inválido selecionado.');
      return;
    }
    this.router.navigate(['/credito', c.numeroCredito]);
  }
}
