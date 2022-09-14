import { Injectable } from '@angular/core';
import { map, Observable, timer } from 'rxjs';
import { RATE_CONSTANTS } from 'src/app/shared/constants/rate.constants';
import { ExchangeRate } from '../models/exchange-rate.model';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private rate$: Observable<ExchangeRate[]>;

  constructor() {
    this.rate$ = timer(1, 3000).pipe(
      map(() => this.getRates())
    );
  }

  getExchangeRate(): Observable<ExchangeRate[]> {
    return this.rate$;
  }

  private getRates(): ExchangeRate[] {
    const usdBaseRate = RATE_CONSTANTS.BASE_RATE;
    const eurBaseRate = RATE_CONSTANTS.BASE_EUR_RATE;

    return [{
      currency: 'USD',
      rate: usdBaseRate + this.getRandom()
    }, {
      currency: 'EUR',
      rate: eurBaseRate + this.getRandom()
    }];
  }

  private getRandom() {
    const maxRange = 0.05;
    const minRange = -0.05;
    return parseFloat((Math.random() * (maxRange - minRange) + minRange).toFixed(2));
  }
}

