import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  numeroNfse = '';
  numeroCredito = '';
  creditos: any[] = [];

  buscarPorNfse(): void {
    // Chamada backend para buscar créditos por NFS-e
    console.log('Buscar por NFS-e:', this.numeroNfse);
    // Exemplo simulado:
    this.creditos = [{ numeroCredito: '123', tipoCredito: 'Tipo A', valorIssqn: 100.0 }];
  }

  buscarPorCredito(): void {
    // Chamada backend para buscar crédito por número
    console.log('Buscar por Crédito:', this.numeroCredito);
    // Exemplo simulado:
    this.creditos = [{ numeroCredito: this.numeroCredito, tipoCredito: 'Tipo B', valorIssqn: 200.0 }];
  }
}
