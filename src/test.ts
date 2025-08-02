import 'jest-preset-angular/setup-jest';
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs'; // Import corrigido

// Verificação básica do ambiente
test('Zone.js deve estar presente', () => {
  expect(Zone).toBeDefined();
  expect(Zone.current).toBeDefined();
});

// Testes profissionais sem APIs depreciadas
describe('Ambiente de Teste Angular', () => {
  it('TestBed deve estar configurado corretamente', () => {
    expect(TestBed).toBeDefined();
    expect(typeof TestBed.configureTestingModule).toBe('function');
    expect(typeof TestBed.inject).toBe('function');
  });

  it('Jest deve estar operacional', () => {
    const mock = jest.fn().mockReturnValue(42);
    expect(mock()).toBe(42);
    expect(mock).toHaveBeenCalled();
  });

  it('deve resolver Promises corretamente', async () => {
    await expect(Promise.resolve('success')).resolves.toBe('success');
    await expect(Promise.reject(new Error('falha'))).rejects.toThrow('falha');
  });

  it('deve manipular Observables corretamente', (done) => {
    const testData = 'angular';
    const test$: Observable<string> = of(testData); // Tipo explícito
    
    test$.subscribe({
      next: (value: string) => { // Tipo definido aqui
        expect(value).toBe(testData);
      },
      complete: () => done() // Garante finalização
    });
  });
});