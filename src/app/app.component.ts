import { Component, OnInit } from '@angular/core';
import { CurrencyInfo } from './core/models/currency-info.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';
  currencyInfo: CurrencyInfo[] = [];

  private usdHistory: CurrencyInfo[] = [];
  private eurHistory: CurrencyInfo[] = [];
  constructor() {
  }

  ngOnInit(): void {
  }

  updateHistory(newConversion: CurrencyInfo) {
    if(newConversion.toCurrency == 'USD') {
      this.updateData(this.usdHistory, newConversion);
    }
    if(newConversion.toCurrency == 'EUR') {
      this.updateData(this.eurHistory, newConversion);
    }
  }

  private updateData(oldList: CurrencyInfo[], newConversion: CurrencyInfo) {
    oldList.push(newConversion);
    if(oldList.length>5) {
      oldList.shift();
    }
    this.currencyInfo = [...oldList];
    if(this.currencyInfo.length > 0) {
      this.title = `${this.currencyInfo[0].fromCurrency} to ${this.currencyInfo[0].toCurrency}`;
    }
  }
}
