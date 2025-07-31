import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CreditoResponse } from '../models/credito-response.interface';

@Component({
  selector: 'app-credito-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credito-list.component.html',
})
export class CreditoListComponent {
  @Input() creditos: CreditoResponse[] = [];
  @Output() selecionarCredito = new EventEmitter<CreditoResponse>();

  onSelecionar(c: CreditoResponse) {
    this.selecionarCredito.emit(c);
  }
}
