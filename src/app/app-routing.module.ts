// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreditoDetailComponent } from './credito-detail/credito-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'credito/:numeroCredito', component: CreditoDetailComponent }
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
