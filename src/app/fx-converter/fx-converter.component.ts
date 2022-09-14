import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, takeWhile } from 'rxjs';
import { CurrencyInfo } from '../core/models/currency-info.model';
import { ExchangeRate } from '../core/models/exchange-rate.model';
import { RateService } from '../core/services/rate.service';
import { RATE_CONSTANTS } from '../shared/constants/rate.constants';

@Component({
  selector: 'app-fx-converter',
  templateUrl: './fx-converter.component.html',
  styleUrls: ['./fx-converter.component.scss']
})
export class FxConverterComponent implements OnInit, OnDestroy{
  @Output()
  currencySetter = new EventEmitter<CurrencyInfo>();

  currencyConversionFormGroup: FormGroup;
  amount: FormControl;
  override: FormControl;

  exchangeRate: number = 1.1;
  pollingRate: number = 1.1;
  fromCurrency: string = 'EUR';
  toCurrency: string = 'USD';
  convertedAmount: number = 1.1;

  private rate$: Observable<ExchangeRate[]>;
  private isAlive = true;

  constructor(private formBuilder: FormBuilder,
              private rateService: RateService) {
    this.rate$ = this.rateService.getExchangeRate();

    this.amount = new FormControl(1, Validators.required);
    this.override = new FormControl(false);

    this.currencyConversionFormGroup = this.formBuilder.group({
      amount: this.amount,
      override: this.override
    });
  }

  ngOnInit(): void {
    this.rate$.pipe(
      takeWhile(() => this.isAlive)
    ).subscribe(response => this.setRates(response));

    this.convertCurrency(true);
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  get isUsdToEur(): boolean {
    return this.toCurrency == 'EUR';
  }

  get isEurToUsd(): boolean {
    return this.toCurrency == 'USD';
  }

  convertCurrency(emitValue: boolean) {
    if (this.amount.value != null && this.amount.value != '') {
      this.convertedAmount = (this.amount.value * this.exchangeRate);
      if(emitValue) {
        let data: CurrencyInfo = {
          fromCurrency: this.fromCurrency,
          overrideOpted: this.override.value,
          toCurrency: this.toCurrency,
          fxRate: this.exchangeRate,
          overrideRate: this.pollingRate,
          amount: this.amount.value,
          convertedAmount: this.convertedAmount
        };
        this.currencySetter.emit(data);
      }
    }
  }

  swapCurrency() {
    if(this.toCurrency == 'USD') {
      this.exchangeRate = RATE_CONSTANTS.BASE_EUR_RATE;
      this.toCurrency = 'EUR';
      this.fromCurrency = 'USD';
    }
    else {
      this.exchangeRate = RATE_CONSTANTS.BASE_RATE;
      this.toCurrency = 'USD';
      this.fromCurrency = 'EUR';
    }
    this.convertCurrency(true);
  }

  private setRates(rates: ExchangeRate[]) {
    this.pollingRate = rates.filter(r => r.currency == this.toCurrency)[0].rate;
    if(this.override.value == true && this.getPercentDiff(this.exchangeRate, this.pollingRate) < 2) {
      this.exchangeRate = this.pollingRate;
      this.convertCurrency(false);
    }
  }

  private getPercentDiff(liveRate: number, pollingRate: number) {
    let percentDiff = ((liveRate - pollingRate) / pollingRate) * 100;
    return (percentDiff < 0 ? (percentDiff * -1) : percentDiff);
  }
}
