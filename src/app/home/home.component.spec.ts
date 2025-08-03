import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';

describe('Componente Home', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar créditos por NFSe', () => {
    component.numeroNfse = '123456';
    component.buscarPorNfse();
    
    expect(component.creditos.length).toBe(1);
    expect(component.creditos[0].numeroCredito).toBe('123');
  });

  it('deve buscar crédito por número', () => {
    component.numeroCredito = '789';
    component.buscarPorCredito();
    
    expect(component.creditos.length).toBe(1);
    expect(component.creditos[0].numeroCredito).toBe('789');
  });

  it('deve atualizar numeroNfse quando o input é alterado', () => {
    // Seleciona o primeiro input (NFS-e)
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    const inputNfse = inputs[0].nativeElement;
    
    inputNfse.value = '654321';
    inputNfse.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    expect(component.numeroNfse).toBe('654321');
  });

  it('deve atualizar numeroCredito quando o input é alterado', () => {
    // Seleciona o segundo input (Crédito)
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    const inputCredito = inputs[1].nativeElement;
    
    inputCredito.value = '987';
    inputCredito.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    expect(component.numeroCredito).toBe('987');
  });

  it('deve chamar buscarPorNfse quando o botão é clicado', () => {
    // Usa jest.spyOn para resolver "spyOn is not defined"
    const spy = jest.spyOn(component, 'buscarPorNfse');
    
    // Seleciona o primeiro botão (Buscar por NFS-e)
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const buttonNfse = buttons[0].nativeElement;
    
    buttonNfse.click();
    
    expect(spy).toHaveBeenCalled();
  });

  it('deve chamar buscarPorCredito quando o botão é clicado', () => {
    const spy = jest.spyOn(component, 'buscarPorCredito');
    
    // Seleciona o segundo botão (Buscar Crédito)
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const buttonCredito = buttons[1].nativeElement;
    
    buttonCredito.click();
    
    expect(spy).toHaveBeenCalled();
  });
});