import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreditoResponse } from '../models/credito-response.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-credito-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credito-list.component.html',
  styleUrls: ['./credito-list.component.css']
})
export class CreditoListComponent {
  @Input() creditos: CreditoResponse[] = [];
  @Output() selecionar = new EventEmitter<CreditoResponse>();

  onSelecionar(credito: CreditoResponse) {
    this.selecionar.emit(credito);
  }
}