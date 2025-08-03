import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditoDetailComponent } from './credito-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CreditoService } from '../services/credito.service';
import { Location } from '@angular/common';

describe('CreditoDetailComponent', () => {
  let component: CreditoDetailComponent;
  let fixture: ComponentFixture<CreditoDetailComponent>;
  let mockCreditoService: any;
  let mockLocation: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockCreditoService = {
      buscarCreditoPorNumero: jest.fn().mockReturnValue(of(null)) // Default seguro
    };

    mockLocation = {
      back: jest.fn()
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('123')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [CreditoDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: CreditoService, useValue: mockCreditoService },
        { provide: Location, useValue: mockLocation }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreditoDetailComponent);
    component = fixture.componentInstance;
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar crédito com sucesso', () => {
    const mockCredito = { numeroCredito: '123', numeroNfse: '456' };
    mockCreditoService.buscarCreditoPorNumero.mockReturnValue(of(mockCredito));
    
    fixture.detectChanges();
    
    expect(component.credito).toEqual(mockCredito);
    expect(component.erro).toBe('');
  });

  it('deve tratar erro quando crédito não for encontrado', () => {
    mockCreditoService.buscarCreditoPorNumero.mockReturnValue(of(null));
    
    fixture.detectChanges();
    
    expect(component.credito).toBeUndefined();
    expect(component.erro).toBe('Crédito não encontrado');
  });

  it('deve tratar erro de servidor offline', () => {
    mockCreditoService.buscarCreditoPorNumero.mockReturnValue(
      throwError(() => ({ status: 0 }))
    );
    
    fixture.detectChanges();
    
    expect(component.credito).toBeUndefined();
    expect(component.erro).toContain('Servidor offline');
  });

  it('deve tratar outros erros', () => {
    mockCreditoService.buscarCreditoPorNumero.mockReturnValue(
      throwError(() => ({ status: 500, message: 'Erro interno' }))
    );
    
    fixture.detectChanges();
    
    expect(component.credito).toBeUndefined();
    expect(component.erro).toContain('Erro ao buscar crédito: Erro interno');
  });

  it('deve mostrar erro quando não há número na URL', () => {
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue(null);
    fixture.detectChanges();
    
    expect(component.credito).toBeUndefined();
    expect(component.erro).toBe('Nenhum número de crédito informado na URL');
  });

  it('deve voltar ao chamar voltar()', () => {
    // Configuração específica para evitar erro no ngOnInit
    mockCreditoService.buscarCreditoPorNumero.mockReturnValue(of(null));
    
    // Executa ngOnInit
    fixture.detectChanges();
    
    // Chama o método de voltar
    component.voltar();
    
    // Verifica se a função de voltar foi chamada
    expect(mockLocation.back).toHaveBeenCalled();
  });
});