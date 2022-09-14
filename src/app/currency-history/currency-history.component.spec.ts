import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyHistoryComponent } from './currency-history.component';

describe('CurrencyHistoryComponent', () => {
  let component: CurrencyHistoryComponent;
  let fixture: ComponentFixture<CurrencyHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
