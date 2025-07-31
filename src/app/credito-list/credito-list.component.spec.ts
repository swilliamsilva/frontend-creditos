import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditoListComponent } from './credito-list.component';
import { CreditoService } from '../services/credito.service';
import { of } from 'rxjs';

describe('CreditoListComponent', () => {
  let component: CreditoListComponent;
  let fixture: ComponentFixture<CreditoListComponent>;
  
  let mockCreditoService = {
    listar: jest.fn().mockReturnValue(of([])),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // CORREÇÃO: Para componentes standalone, use imports em vez de declarations
      imports: [CreditoListComponent], // Alterado aqui
      providers: [
        { provide: CreditoService, useValue: mockCreditoService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});