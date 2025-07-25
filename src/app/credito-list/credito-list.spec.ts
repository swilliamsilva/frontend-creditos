import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditoList } from './credito-list';

describe('CreditoList', () => {
  let component: CreditoList;
  let fixture: ComponentFixture<CreditoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
