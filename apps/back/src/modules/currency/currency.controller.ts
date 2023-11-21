import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from '@timeismoney/dto/dist/currency/create-currency.dto';
import { UpdateCurrencyDto } from '@timeismoney/dto/dist/currency/update-currency.dto';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  async create(
    @Body() createCurrencyDto: CreateCurrencyDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.currencyService.create(createCurrencyDto, {
      crudQuery,
    });
  }

  @Get()
  async findMany(@Query('crudQuery') crudQuery: string) {
    return await this.currencyService.findMany({ crudQuery });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.currencyService.findOne(id, { crudQuery });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
    @Query('crudQuery') crudQuery: string,
  ) {
    return await this.currencyService.update(id, updateCurrencyDto, {
      crudQuery,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('crudQuery') crudQuery: string) {
    return this.currencyService.remove(id, { crudQuery });
  }
}
