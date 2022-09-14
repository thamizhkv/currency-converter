import { Currency } from "./currency.type";

export interface ExchangeRate {
  currency: Currency,
  rate: number
}
