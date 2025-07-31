import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditoConsultaComponent } from './credito-consulta.component';


import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ConsultaStateService } from '../services/consulta-state.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common'


import { FormsModule } from '@angular/forms';



describe('CreditoConsultaComponent', () => {
  let component: CreditoConsultaComponent;
  let fixture: ComponentFixture<CreditoConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //  Importar apenas módulos/componentes, não providers
      imports: [
        CreditoConsultaComponent,  // Componente standalone
        CommonModule,
        FormsModule
      ],
      providers: [
        // Mover os HTTP providers para aqui
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        
        {
          provide: ConsultaStateService,
          useValue: {
            credito$: of([]),
        //    buscarCreditoPorNfse: jasmine.createSpy('buscarCreditoPorNfse'),
            buscarCreditoPorNfse: jest.fn()
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreditoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});