import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';
import { Prisma, User, Currency } from '@prisma/client';

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

  private async addFollowedCryptoCurrency(
    userId: number,
    currencyId: number,
  ): Promise<void> {
    const existingFollowedCurrency =
      await this.prisma.userFollowedCurrencies.findFirst({
        where: {
          userId: userId,
          currencyId: currencyId,
        },
      });

    if (!existingFollowedCurrency) {
      await this.prisma.userFollowedCurrencies.create({
        data: {
          userId: userId,
          currencyId: currencyId,
          // Other fields specific to UserFollowedCurrencies model, if any
        },
      });
    }
  }

  private async removeFollowedCryptoCurrency(
    userId: number,
    currencyId: number,
  ): Promise<void> {
    const existingFollowedCurrency =
      await this.prisma.userFollowedCurrencies.findFirst({
        where: {
          userId: userId,
          currencyId: currencyId,
        },
      });

    if (existingFollowedCurrency) {
      await this.prisma.userFollowedCurrencies.delete({
        where: {
          id: existingFollowedCurrency.id,
        },
      });
    }
  }

  async getFollowedCurrencies(userId: number): Promise<Currency[]> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        followedCryptoCurrencies: {
          include: {
            currency: true,
          },
        },
      },
    });
    if (user) {
      // Extract the currencies from the user's followedCryptoCurrencies relationship
      const followedCurrencies = user.followedCryptoCurrencies.map(
        (followedCurrency) => followedCurrency.currency,
      );

      return followedCurrencies;
    } else {
      // Handle the case where the user with the specified ID is not found
      throw new Error(`User with ID ${userId} not found`);
    }
  }

  override async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        followedCryptoCurrencies: {
          include: {
            currency: true,
          },
        },
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async insertOne(data: Prisma.UserCreateInput): Promise<User | null> {
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

  async followNewCryptos(userId: number, cryptoIds: number[]) {
    for (const id of cryptoIds)
      await this.addFollowedCryptoCurrency(userId, id);
    return this.findOne(userId);
  }

  async unfollowCryptos(userId: number, cryptoIds: number[]) {
    for (const id of cryptoIds)
      await this.removeFollowedCryptoCurrency(userId, id);
    return this.findOne(userId);
  }

  async followedCryptos(userId: number): Promise<Currency[]> {
    return this.getFollowedCurrencies(userId);
  }
}
