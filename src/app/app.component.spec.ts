import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MessageService } from './services/message.service';
import { signal, WritableSignal } from '@angular/core';

// Criar uma interface estendida para o mock
interface MockMessageService extends MessageService {
  setMessage: (msg: string | null) => void;
  currentMessage: WritableSignal<string | null>;
}

describe('Componente App', () => {
  let fixture: ComponentFixture<AppComponent>;
  let messageService: MockMessageService;

  beforeEach(async () => {
    // Criar um mock completo do serviço
    const mockMessageService: MockMessageService = {
      currentMessage: signal(null),
      setMessage: function(msg: string | null) {
        this.currentMessage.set(msg);
      }
    } as MockMessageService;

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: MessageService, useValue: mockMessageService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    messageService = TestBed.inject(MessageService) as MockMessageService;
    fixture.detectChanges();
  });

  it('deve criar o componente App', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve exibir mensagens de erro do MessageService', () => {
    // Atualizar a mensagem
    messageService.setMessage('Erro de teste');
    fixture.detectChanges();
    
    const errorElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorElement).toBeTruthy();
    expect(errorElement.textContent).toContain('Erro de teste');
  });

  it('não deve exibir mensagem quando não há erro', () => {
    // Limpar a mensagem
    messageService.setMessage(null);
    fixture.detectChanges();
    
    const errorElement = fixture.nativeElement.querySelector('.error-message');
    expect(errorElement).toBeNull();
  });

  it('deve conter o router-outlet', () => {
    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });
});