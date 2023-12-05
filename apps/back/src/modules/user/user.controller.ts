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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@timeismoney/dto';
import {
  UserInterceptor,
  UsersListInterceptor,
} from '../../interceptors/user.interceptor';
import { AccessGuard } from '../../guards/passport/jwt-at.guard';
import { RequestUser } from '../../decorators/request-user.decorator';
import { IRequestUser } from '../../types/passport/request-user';

@UseGuards(AccessGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @UseInterceptors(UserInterceptor)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.userService.update(id, updateUserDto, {
      crudQuery,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.userService.remove(id, { crudQuery });
  }
}
