import { PartialType } from "@nestjs/mapped-types";
import { CreateCurrencyDto } from "./createCurrency.dto";

export class UpdateCurrencyDto extends PartialType(CreateCurrencyDto) {}
