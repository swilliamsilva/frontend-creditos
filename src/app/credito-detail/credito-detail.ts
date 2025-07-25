// src/app/credito-detail/credito-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditoService, Credito } from '../services/credito.service';

@Component({
  selector: 'app-credito-detail',
  templateUrl: './credito-detail.component.html',
  styleUrls: ['./credito-detail.component.css']
})
export class CreditoDetailComponent implements OnInit {
  credito?: Credito;

  constructor(private route: ActivatedRoute, private creditoService: CreditoService) {}

  ngOnInit(): void {
    const numero = this.route.snapshot.paramMap.get('numeroCredito');
    if (numero) {
      this.creditoService.getCreditoPorNumero(numero).subscribe(data => this.credito = data);
    }
  }
}