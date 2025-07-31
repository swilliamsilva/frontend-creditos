import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('Componente App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
      
    }).compileComponents();
  });

  it('deve criar o componente App', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('deve renderizar o título corretamente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, frontend-creditos');
  });
});
