// app.routes.ts
import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CreditoConsultaComponent } from './credito-consulta/credito-consulta.component';
import { CreditoDetailComponent } from './credito-detail/credito-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'consulta', component: CreditoConsultaComponent },
  { path: 'credito/:numeroCredito', component: CreditoDetailComponent },
  { path: '**', redirectTo: '' }
];
