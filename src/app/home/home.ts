// src/app/home/// src/app/home/home.component.ts
import { Component } from '@angular/core';
import { CreditoService, Credito } from '../services/credito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  numeroNfse = '';
  numeroCredito = '';
  creditos: Credito[] = [];

  constructor(private creditoService: CreditoService, private router: Router) {}

  buscarPorNfse(): void {
    if (this.numeroNfse) {
      this.creditoService.getCreditosPorNfse(this.numeroNfse).subscribe(data => this.creditos = data);
    }
  }

  buscarPorCredito(): void {
    if (this.numeroCredito) {
      this.router.navigate(['/credito', this.numeroCredito]);
    }
  }
}
import { Component } from '@angular/core';
import { CreditoService, Credito } from '../services/credito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  numeroNfse = '';
  numeroCredito = '';
  creditos: Credito[] = [];

  constructor(private creditoService: CreditoService, private router: Router) {}

  buscarPorNfse(): void {
    if (this.numeroNfse) {
      this.creditoService.getCreditosPorNfse(this.numeroNfse).subscribe(data => this.creditos = data);
    }
  }

  buscarPorCredito(): void {
    if (this.numeroCredito) {
      this.router.navigate(['/credito', this.numeroCredito]);
    }
  }
}
