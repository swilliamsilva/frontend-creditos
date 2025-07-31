import { TestBed } from '@angular/core/testing';
import { ConsultaStateService } from './consulta-state.service';
import { CreditoResponse } from '../models/credito-response.interface';

describe('ConsultaStateService', () => {
  let service: ConsultaStateService;
  
  const mockCredito: CreditoResponse = {
    numeroCredito: 1,
    numeroNfse: 'NFSE-001',
    dataConstituicao: '2023-01-01',
    valorIssqn: 1000.00,
    tipoCredito: 'Simples',
    simplesNacional: true,
    aliquota: 0.1,
    valorFaturado: 10000.00,
    valorDeducao: 0,
    baseCalculo: 10000.00
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaStateService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve ter valores iniciais corretos', () => {
    expect(service.tipoConsulta()).toBe('todos');
    expect(service.termoBusca()).toBe('');
    expect(service.creditos()).toEqual([]);
    expect(service.carregando()).toBe(false);
    expect(service.erro()).toBe('');
    expect(service.consultaRealizada()).toBe(false);
  });

  it('deve atualizar tipoConsulta corretamente', () => {
    service.tipoConsulta.set('nfse');
    expect(service.tipoConsulta()).toBe('nfse');
    
    service.tipoConsulta.set('credito');
    expect(service.tipoConsulta()).toBe('credito');
  });

  it('deve atualizar termoBusca corretamente', () => {
    const termo = 'teste123';
    service.termoBusca.set(termo);
    expect(service.termoBusca()).toBe(termo);
  });

  it('deve atualizar creditos corretamente', () => {
    const creditos = [mockCredito];
    service.creditos.set(creditos);
    expect(service.creditos()).toEqual(creditos);
  });

  it('deve atualizar carregando corretamente', () => {
    service.carregando.set(true);
    expect(service.carregando()).toBe(true);
    
    service.carregando.set(false);
    expect(service.carregando()).toBe(false);
  });

  it('deve atualizar erro corretamente', () => {
    const errorMsg = 'Erro de teste';
    service.erro.set(errorMsg);
    expect(service.erro()).toBe(errorMsg);
  });

  it('deve atualizar consultaRealizada corretamente', () => {
    service.consultaRealizada.set(true);
    expect(service.consultaRealizada()).toBe(true);
    
    service.consultaRealizada.set(false);
    expect(service.consultaRealizada()).toBe(false);
  });

  describe('limparResultados', () => {
    beforeEach(() => {
      // Configurar estado sujo antes de cada teste
      service.tipoConsulta.set('nfse');
      service.termoBusca.set('12345');
      service.creditos.set([mockCredito]);
      service.carregando.set(true);
      service.erro.set('Erro anterior');
      service.consultaRealizada.set(true);
    });

    it('deve limpar resultados mantendo tipoConsulta', () => {
      service.limparResultados();
      
      // Mantém o tipo de consulta
      expect(service.tipoConsulta()).toBe('nfse');
      
      // Limpa os demais estados
      expect(service.termoBusca()).toBe('');
      expect(service.creditos()).toEqual([]);
      expect(service.carregando()).toBe(false); // Agora deve ser false
      expect(service.erro()).toBe('');
      expect(service.consultaRealizada()).toBe(false);
    });

    it('deve ser chamado sem erros quando já está limpo', () => {
      // Primeira limpeza
      service.limparResultados();
      
      // Segunda limpeza (estado já limpo)
      service.limparResultados();
      
      // Verificar se permanece limpo
      expect(service.termoBusca()).toBe('');
      expect(service.creditos()).toEqual([]);
      expect(service.carregando()).toBe(false); // Agora deve ser false
      expect(service.erro()).toBe('');
      expect(service.consultaRealizada()).toBe(false);
    });
  });
});