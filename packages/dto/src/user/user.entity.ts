export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  id: number;
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  role: string;
  currency?: number;
  pressKeywords: string[];
  createdAt: Date;
  updatedAt: Date;
}
