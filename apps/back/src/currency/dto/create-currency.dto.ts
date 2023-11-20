export class CreateCurrencyDto {
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  pressKeywords: string[] = [];
  currencyId?: number;
}
