export interface CurrencyInfo {
  fromCurrency: string;
  toCurrency: string;
  overrideOpted: boolean;
  fxRate: number;
  overrideRate: number;
  amount: number;
  convertedAmount: number
}
