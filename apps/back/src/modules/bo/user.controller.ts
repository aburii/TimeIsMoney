import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '@timeismoney/dto';
import { UserInterceptor } from '../../interceptors/user.interceptor';
import { AccessGuard } from '../../guards/passport/jwt-at.guard';
import { BoGuard } from '../../guards/bo.guard';
import { RequestUser } from '../../decorators/request-user.decorator';
import { IRequestUser } from '../../types/passport/request-user';
import { UserService } from '../user/user.service';

@UseGuards(AccessGuard, BoGuard)
@Controller('bo/users')
export class BoUserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.userService.create(createUserDto, { crudQuery });
  }

  @UseInterceptors(UserInterceptor)
  @Get('me')
  async getMe(@RequestUser() user: IRequestUser) {
    return await this.userService.findOne(user.userId);
  }
}
