import { TestBed } from '@angular/core/testing';
import { CreditoService } from './credito.service';
import { 
  HttpTestingController, 
  provideHttpClientTesting 
} from '@angular/common/http/testing';
import { CreditoResponse } from '../models/credito-response.interface';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CreditoService', () => {
  let service: CreditoService;
  let httpMock: HttpTestingController;

  const mockCredito: CreditoResponse = {
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreditoService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CreditoService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Mock das propriedades privadas
    (service as any).apiUrl = 'http://localhost:8080/api';
    (service as any).username = 'testuser';
    (service as any).password = 'testpass';
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve buscar créditos por NFSe', () => {
    const numeroNfse = '123456';

    service.buscarCreditosPorNfse(numeroNfse).subscribe(creditos => {
      expect(creditos.length).toBe(1);
      expect(creditos[0].numeroNfse).toBe(numeroNfse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/creditos/nfse/${numeroNfse}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toContain('Basic');
    req.flush([mockCredito]);
  });

  it('deve buscar crédito por número de crédito', () => {
    const numeroCredito = '1';

    service.buscarCreditoPorNumero(numeroCredito).subscribe(credito => {
      expect(credito).toEqual(mockCredito);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/creditos/numero/${numeroCredito}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCredito);
  });

  it('deve usar o alias buscarPorNumeroCredito', () => {
    const numeroCredito = '1';
    
    service.buscarPorNumeroCredito(numeroCredito).subscribe();
    
    const req = httpMock.expectOne(`${service['apiUrl']}/creditos/numero/${numeroCredito}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCredito);
  });

  it('deve retornar array vazio em caso de erro na busca por NFSe', () => {
    const numeroNfse = '999';

    service.buscarCreditosPorNfse(numeroNfse).subscribe(creditos => {
      expect(creditos).toEqual([]);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/creditos/nfse/${numeroNfse}`);
    req.flush(null, { 
      status: 500, 
      statusText: 'Internal Server Error' 
    });
  });

  it('deve retornar null em caso de erro na busca por número de crédito', () => {
    const numeroCredito = '999';

    service.buscarCreditoPorNumero(numeroCredito).subscribe(credito => {
      expect(credito).toBeNull();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/creditos/numero/${numeroCredito}`);
    req.flush(null, { 
      status: 404, 
      statusText: 'Not Found' 
    });
  });

  it('deve tratar erro de rede na busca por NFSe', () => {
    const numeroNfse = '999';

    service.buscarCreditosPorNfse(numeroNfse).subscribe(creditos => {
      expect(creditos).toEqual([]);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/creditos/nfse/${numeroNfse}`);
    req.error(new ProgressEvent('Network error'));
  });
});