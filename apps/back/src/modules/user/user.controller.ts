import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UseGuards,
  ForbiddenException,
  ParseArrayPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserEntity } from '@timeismoney/dto';
import {
  UserInterceptor,
  UsersListInterceptor,
} from '../../interceptors/user.interceptor';
import { AccessGuard } from '../../guards/passport/jwt-at.guard';
import { BoGuard } from '../../guards/bo.guard';
import { RequestUser } from '../../decorators/request-user.decorator';
import { IRequestUser } from '../../types/passport/request-user';

@UseGuards(AccessGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private async canEditUser(
    currentUser: IRequestUser,
    userId: number,
  ): Promise<boolean> {
    const dbUser = await this.userService.findOne(currentUser.userId);

    return (
      (dbUser.role === 'ADMIN' && currentUser.app === 'BO') ||
      currentUser.userId == userId
    );
  }

  @UseGuards(BoGuard)
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.userService.create(createUserDto, { crudQuery });
  }

  @UseInterceptors(UsersListInterceptor)
  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    return await this.userService.findMany({ crudQuery });
  }

  @UseInterceptors(UserInterceptor)
  @Get('me')
  async getMe(@RequestUser() user: IRequestUser) {
    return await this.userService.findOne(user.userId);
  }

  @UseInterceptors(UserInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @Get(':id/followed')
  async followedCryptos(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.followedCryptos(id);
  }

  @UseInterceptors(UserInterceptor)
  @Patch(':id')
  async update(
    @RequestUser() user: IRequestUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: Partial<UserEntity>,
    @Query('crudQuery') crudQuery: string,
  ) {
    const canEdit = await this.canEditUser(user, id);

    if (!canEdit) {
      throw new ForbiddenException(
        'You do not have permission to edit this user.',
      );
    }

    return await this.userService.update(id, updateUserDto, {
      crudQuery,
    });
  }

  @UseInterceptors(UserInterceptor)
  @Post(':id/follow')
  async followCryptos(
    @RequestUser() user: IRequestUser,
    @Param('id', ParseIntPipe) id: number,
    @Query('cryptos', new ParseArrayPipe({ items: Number, separator: ',' }))
    cryptos: number[],
  ) {
    const canEdit = await this.canEditUser(user, id);

    if (!canEdit) {
      throw new ForbiddenException(
        'You do not have permission to edit this user.',
      );
    }

    return await this.userService.followNewCryptos(user.userId, cryptos);
  }

  @UseInterceptors(UserInterceptor)
  @Post(':id/unfollow')
  async unfollowCryptos(
    @RequestUser() user: IRequestUser,
    @Param('id', ParseIntPipe) id: number,
    @Query('cryptos', new ParseArrayPipe({ items: Number, separator: ',' }))
    cryptos: number[],
  ) {
    const canEdit = await this.canEditUser(user, id);
    if (!canEdit) {
      throw new ForbiddenException(
        'You do not have permission to edit this user.',
      );
    }

    return await this.userService.unfollowCryptos(user.userId, cryptos);
  }

  @Delete(':id')
  async remove(
    @RequestUser() user: IRequestUser,
    @Param('id', ParseIntPipe) id: number,
    @Query('crudQuery') crudQuery: string,
  ) {
    const canEdit = await this.canEditUser(user, id);
    if (!canEdit) {
      throw new ForbiddenException(
        'You do not have permission to edit this user.',
      );
    }
    return this.userService.remove(id, { crudQuery });
  }
}
