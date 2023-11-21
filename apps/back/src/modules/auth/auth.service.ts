import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@timeismoney/models/dist';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  // ======= SERVICE FOR SIGN UP THE APPLICATION =======
  async signUp(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    try {
      return await this.prismaService.user.create({
        data: {
          lastname: data.lastname,
          firstname: data.firstname,
          nickname: data.nickname,
          email: data.email,
          password: hashedPassword,
          default_currency: {
            connect: { id: data.currencyId },
          },
        },
      });
    } catch (error) {
      throw new ForbiddenException('Email already exists');
    }
  }
  // ======= SERVICE FOR LOG IN THE APPLICATION =======
  async logIn(data) {
    const user = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new ForbiddenException('Wrong email or password');
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Wrong email or password');
    }
    const token = this.jwtService.sign({
      id: user.id,
      nickname: user.nickname,
      email: user.email,
    });
    return { user, token };
  }
}
