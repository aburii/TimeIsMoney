export class UserDto {
  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }

  id: number;
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  currency?: number;
  pressKeywords: string[];
  createdAt: Date;
  updatedAt: Date;
}
