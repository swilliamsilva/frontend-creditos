import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditoDetailComponent } from './credito-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CreditoDetailComponent', () => {
  let component: CreditoDetailComponent;
  let fixture: ComponentFixture<CreditoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditoDetailComponent], // standalone component vai aqui
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: { credito: { numeroNfse: '123' } } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreditoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar dados do crédito', () => {
    expect(component.credito?.numeroNfse).toEqual('123');
  });
});
