import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditoDetail } from './credito-detail';

describe('CreditoDetail', () => {
  let component: CreditoDetail;
  let fixture: ComponentFixture<CreditoDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditoDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditoDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
