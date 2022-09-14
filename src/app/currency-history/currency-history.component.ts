import { Component, Input, OnInit } from '@angular/core';
import { CurrencyInfo } from '../core/models/currency-info.model';

@Component({
  selector: 'app-currency-history',
  templateUrl: './currency-history.component.html',
  styleUrls: ['./currency-history.component.scss']
})
export class CurrencyHistoryComponent implements OnInit {
  @Input()
  currencyInfo!: CurrencyInfo[];

  @Input()
  title: string = '';

  currencyColumns: string [] = [ 'fxRate', 'overrideRate', 'overrideOpted', 'amount', 'convertedAmount'];

  constructor() {
  }

  ngOnInit(): void {
  }
}
