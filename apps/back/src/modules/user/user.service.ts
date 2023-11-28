import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';
import { User } from '@prisma/client';
import { signUpDto } from '@timeismoney/dto';

@Injectable()
export class UserService extends PrismaCrudService {
  constructor() {
    super({
      model: 'user',
      allowedJoins: [],
      defaultJoins: [],
    });
  }

  get prisma() {
    return PrismaCrudService.prismaClient;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async insertOne(data: signUpDto): Promise<User | null> {
    return this.prisma.user.create({
      data: {
        ...data,
        refresh: '',
      },
    });
  }

  async updateOne(id: number, data: Partial<User>): Promise<User | null> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
