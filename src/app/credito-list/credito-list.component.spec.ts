import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditoListComponent } from './credito-list.component';
import { By } from '@angular/platform-browser';
import { CreditoResponse } from '../models/credito-response.interface';

describe('CreditoListComponent', () => {
  let component: CreditoListComponent;
  let fixture: ComponentFixture<CreditoListComponent>;
  
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
    await TestBed.configureTestingModule({
      imports: [CreditoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreditoListComponent);
    component = fixture.componentInstance;
    component.creditos = mockCreditos;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir créditos quando receber dados via input', () => {
    const itens = fixture.debugElement.queryAll(By.css('.list-group-item'));
    expect(itens.length).toBe(1);
    
    const primeiroItem = itens[0].nativeElement;
    const textContent = primeiroItem.textContent;
    
    // Verifica se os dados principais são exibidos com o espaçamento real
    expect(textContent).toContain('Crédito: 1');
    expect(textContent).toContain('NFSe:  123456'); // Dois espaços após ":"
    expect(textContent).toContain('30/07/2025');
    expect(textContent).toContain('R$105.00');
  });

  it('não deve exibir itens quando não há créditos', () => {
    component.creditos = [];
    fixture.detectChanges();
    
    const itens = fixture.debugElement.queryAll(By.css('.list-group-item'));
    expect(itens.length).toBe(0);
  });

  it('deve emitir evento ao clicar no botão "Ver Detalhes"', () => {
    const spy = jest.spyOn(component.selecionar, 'emit');
    
    const botao = fixture.debugElement.query(By.css('button'));
    botao.triggerEventHandler('click', null);
    
    expect(spy).toHaveBeenCalledWith(mockCreditos[0]);
  });
});