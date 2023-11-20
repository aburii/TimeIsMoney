export class CreateUserDto {
  name: string;
  symbol: string;
  api_id: string;
  is_crypto: boolean;
  image_url?: string;
}
