import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditoConsultaComponent } from './credito-consulta.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ConsultaStateService } from '../services/consulta-state.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditoService } from '../services/credito.service';

describe('CreditoConsultaComponent', () => {
  let component: CreditoConsultaComponent;
  let fixture: ComponentFixture<CreditoConsultaComponent>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockCreditoService: any;

  beforeEach(async () => {
    // Configuração dos mocks
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue(null)
        }
      }
    };

    mockRouter = {
      navigate: jest.fn()
    };

    mockCreditoService = {
      buscarCreditosPorNfse: jest.fn().mockReturnValue(of([])),
      buscarCreditoPorNumero: jest.fn().mockReturnValue(of(null))
    };

    await TestBed.configureTestingModule({
      imports: [
        CreditoConsultaComponent,
        CommonModule,
        FormsModule
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        {
          provide: ConsultaStateService,
          useValue: {
            creditos: jest.fn(),
            erro: jest.fn(),
            consultaRealizada: jest.fn(),
            carregando: jest.fn(),
            tipoConsulta: jest.fn(),
            termoBusca: jest.fn(),
            buscarCreditoPorNfse: jest.fn()
          }
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: CreditoService, useValue: mockCreditoService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreditoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});