import { TestBed } from '@angular/core/testing';
import { CreditoService } from './credito.service';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CreditoResponse } from '../models/credito-response.interface';

describe('CreditoService', () => {
  let service: CreditoService;
  let httpMock: HttpTestingController;

  const mockCreditos: CreditoResponse[] = [
    {
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
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreditoService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CreditoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve listar todos os créditos', () => {
    service.listarTodos().subscribe(creditos => {
      expect(creditos.length).toBe(1);
      expect(creditos).toEqual(mockCreditos);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/creditos');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toContain('Basic');
    req.flush(mockCreditos);
  });

  it('deve buscar crédito por número NFSe', () => {
    const numeroNfse = '123456';

    service.buscarPorNumeroNfse(numeroNfse).subscribe(creditos => {
      expect(creditos.length).toBe(1);
      expect(creditos[0].numeroNfse).toBe(numeroNfse);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/creditos/nfse/${numeroNfse}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCreditos);
  });

  it('deve buscar crédito por número de crédito', () => {
    const numeroCredito = '999';

    service.buscarPorNumeroCredito(numeroCredito).subscribe(credito => {
      expect(credito).toEqual(mockCreditos[0]);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/creditos/numero/${numeroCredito}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCreditos[0]);
  });
});
