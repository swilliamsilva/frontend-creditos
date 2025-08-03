import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreditoConsultaComponent } from './credito-consulta.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ConsultaStateService } from '../services/consulta-state.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditoService } from '../services/credito.service';
import { CreditoResponse } from '../models/credito-response.interface';
import { WritableSignal } from '@angular/core';

// Função para criar um signal mockado
function mockSignal<T>(initialValue: T): WritableSignal<T> & { set: jest.Mock } {
  let value = initialValue;
  const setFn = jest.fn((newValue: T) => {
    value = newValue;
  });
  
  const signalFn = (() => value) as WritableSignal<T>;
  signalFn.set = setFn;
  
  return signalFn as WritableSignal<T> & { set: jest.Mock };
}

describe('CreditoConsultaComponent', () => {
  let component: CreditoConsultaComponent;
  let fixture: ComponentFixture<CreditoConsultaComponent>;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockCreditoService: any;
  let mockConsultaStateService: any;

  const mockCreditos: CreditoResponse[] = [{
    numeroCredito: 1,
    numeroNfse: '123456',
    dataConstituicao: '2025-07-30',
    valorIssqn: 5.0,
    tipoCredito: 'NFSE',
    simplesNacional: false,
    aliquota: 5.0,
    valorFaturado: 105.0,
    valorDeducao: 0,
    baseCalculo: 100.0
  }];

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('123456')
        }
      }
    };

    mockRouter = {
      navigate: jest.fn()
    };

    mockCreditoService = {
      buscarCreditosPorNfse: jest.fn().mockReturnValue(of(mockCreditos)),
      buscarCreditoPorNumero: jest.fn().mockReturnValue(of(mockCreditos[0]))
    };

    // Mock completamente refatorado usando signals mockados
    mockConsultaStateService = {
      carregando: mockSignal(false),
      erro: mockSignal(''),
      consultaRealizada: mockSignal(false),
      creditos: mockSignal([] as CreditoResponse[]),
      tipoConsulta: mockSignal(''),
      termoBusca: mockSignal(''),
      
      limparResultados: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CreditoConsultaComponent, CommonModule, FormsModule],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: ConsultaStateService, useValue: mockConsultaStateService },
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

  it('deve inicializar com parâmetros da rota', fakeAsync(() => {
    component.ngOnInit();
    tick(150); // Espera o setTimeout
    
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalled();
    expect(component.numeroCredito).toBe('123456');
    expect(mockCreditoService.buscarCreditoPorNumero).toHaveBeenCalledWith('123456');
  }));

  it('deve consultar por NFSe', fakeAsync(() => {
    component.numeroNfse = '654321';
    component.consultarPorNfse();
    tick();
    
    expect(mockConsultaStateService.carregando.set).toHaveBeenCalledWith(true);
    expect(mockConsultaStateService.erro.set).toHaveBeenCalledWith('');
    expect(mockConsultaStateService.consultaRealizada.set).toHaveBeenCalledWith(false);
    expect(mockConsultaStateService.tipoConsulta.set).toHaveBeenCalledWith('nfse');
    expect(mockConsultaStateService.termoBusca.set).toHaveBeenCalledWith('654321');
    expect(mockCreditoService.buscarCreditosPorNfse).toHaveBeenCalledWith('654321');
  }));

  it('deve consultar por número de crédito', fakeAsync(() => {
    component.numeroCredito = '789';
    component.consultarPorNumeroCredito();
    tick();
    
    expect(mockConsultaStateService.carregando.set).toHaveBeenCalledWith(true);
    expect(mockConsultaStateService.erro.set).toHaveBeenCalledWith('');
    expect(mockConsultaStateService.consultaRealizada.set).toHaveBeenCalledWith(false);
    expect(mockConsultaStateService.tipoConsulta.set).toHaveBeenCalledWith('credito');
    expect(mockConsultaStateService.termoBusca.set).toHaveBeenCalledWith('789');
    expect(mockCreditoService.buscarCreditoPorNumero).toHaveBeenCalledWith('789');
  }));

  it('deve navegar ao selecionar crédito', () => {
    const credito = mockCreditos[0];
    component.onSelecionar(credito);
    
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/credito', credito.numeroCredito]);
  });

  it('deve tratar erro na consulta por NFSe', fakeAsync(() => {
    mockCreditoService.buscarCreditosPorNfse = jest.fn().mockReturnValue(
      throwError(() => new Error('Erro de teste'))
    );
    
    component.numeroNfse = '999';
    component.consultarPorNfse();
    tick();
    
    expect(mockConsultaStateService.erro.set).toHaveBeenCalledWith(
      'Erro ao consultar NFSe: Erro de teste'
    );
    expect(mockConsultaStateService.creditos.set).toHaveBeenCalledWith([]);
  }));

  it('deve tratar erro na consulta por número de crédito', fakeAsync(() => {
    mockCreditoService.buscarCreditoPorNumero = jest.fn().mockReturnValue(
      throwError(() => new Error('Erro de teste'))
    );
    
    component.numeroCredito = '999';
    component.consultarPorNumeroCredito();
    tick();
    
    expect(mockConsultaStateService.erro.set).toHaveBeenCalledWith(
      'Erro ao consultar crédito: Erro de teste'
    );
    expect(mockConsultaStateService.creditos.set).toHaveBeenCalledWith([]);
  }));

  it('deve mostrar erro ao consultar sem parâmetros', () => {
    component.numeroNfse = '';
    component.numeroCredito = '';
    component.consultar();
    
    expect(mockConsultaStateService.erro.set).toHaveBeenCalledWith(
      'Preencha um número para consultar.'
    );
    expect(mockConsultaStateService.creditos.set).toHaveBeenCalledWith([]);
  });

  it('deve abrir prompt quando não há parâmetro na rota', fakeAsync(() => {
    mockActivatedRoute.snapshot.paramMap.get = jest.fn().mockReturnValue(null);
    window.prompt = jest.fn().mockReturnValue('987');
    
    component.ngOnInit();
    tick(150);
    
    expect(window.prompt).toHaveBeenCalledWith('Informe o número do Crédito ou da NFSe:');
    expect(component.numeroCredito).toBe('987');
    expect(mockCreditoService.buscarCreditoPorNumero).toHaveBeenCalledWith('987');
  }));
});