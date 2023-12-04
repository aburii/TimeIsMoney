export class CreateCurrencyDto {
  name: string;
  symbol: string;
  api_id: number;
  is_crypto: boolean;
  image_url?: string;
}
