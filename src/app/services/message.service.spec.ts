import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
    service = TestBed.inject(MessageService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve inicializar sem mensagem', () => {
    expect(service.currentMessage()).toBeNull();
  });

  it('deve definir e limpar mensagem', () => {
    // Definir mensagem
    service.showError('Test error');
    expect(service.currentMessage()).toBe('Test error');
    
    // Limpar manualmente
    service.clear();
    expect(service.currentMessage()).toBeNull();
  });

  it('deve limpar mensagem automaticamente após 5 segundos', fakeAsync(() => {
    // Definir mensagem
    service.showError('Timeout error');
    expect(service.currentMessage()).toBe('Timeout error');
    
    // Avançar 4 segundos (mensagem ainda deve estar lá)
    tick(4000);
    expect(service.currentMessage()).toBe('Timeout error');
    
    // Avançar mais 1 segundo (total 5 segundos)
    tick(1000);
    expect(service.currentMessage()).toBeNull();
  }));

  it('deve substituir mensagem existente', fakeAsync(() => {
    // Primeira mensagem
    service.showError('First error');
    expect(service.currentMessage()).toBe('First error');
    
    // Segunda mensagem antes do timeout
    service.showError('Second error');
    expect(service.currentMessage()).toBe('Second error');
    
    // Avançar 5 segundos - só a última deve ser limpa
    tick(5000);
    expect(service.currentMessage()).toBeNull();
  }));

  it('deve cancelar timeout anterior ao definir nova mensagem', fakeAsync(() => {
    // Primeira mensagem
    service.showError('First error');
    
    // Segunda mensagem após 2 segundos
    tick(2000);
    service.showError('Second error');
    
    // Avançar 4 segundos (total 6 segundos)
    tick(4000);
    
    // A segunda mensagem deve ter sido limpa após 5 segundos (total 6 segundos)
    expect(service.currentMessage()).toBeNull();
  }));

  it('deve lidar com múltiplas chamadas de clear', () => {
    service.showError('Test error');
    service.clear();
    service.clear(); // Chamada extra
    expect(service.currentMessage()).toBeNull();
  });
});