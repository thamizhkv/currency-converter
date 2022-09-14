import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('should the basics be populated', () => {
    beforeEach(() => {
      component.updateHistory({
        fromCurrency: 'EUR',
        toCurrency: 'USD',
        fxRate: 1.1,
        amount: 1,
        overrideOpted: false,
        overrideRate: 1.02,
        convertedAmount: 1.1
      });
    })

    it('should the title be updated as EUR to USD', () => {
      expect(component.title).toBe('EUR to USD');
    });

    it('should the history be populated', () => {
      expect(component.currencyInfo.length).toBe(1);
    });
  });
});
