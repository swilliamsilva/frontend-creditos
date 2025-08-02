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
    
    this.creditos = [{ numeroCredito: '123', tipoCredito: 'Tipo A Simulado', valorIssqn: 100.0 }];
  }

  buscarPorCredito(): void {
    
    this.creditos = [{ numeroCredito: this.numeroCredito, tipoCredito: 'Tipo B Simulado', valorIssqn: 200.0 }];
  }
}