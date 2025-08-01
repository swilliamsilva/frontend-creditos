import { Routes } from '@angular/router';
import { CreditoConsultaComponent } from './credito-consulta/credito-consulta.component';
import { CreditoDetailComponent } from './credito-detail/credito-detail.component';

export const routes: Routes = [
  { path: 'consulta', component: CreditoConsultaComponent },
  { path: 'credito/:numeroCredito', component: CreditoDetailComponent },
  { path: '', redirectTo: '/consulta', pathMatch: 'full' },
  { path: '**', redirectTo: '/consulta' }
];