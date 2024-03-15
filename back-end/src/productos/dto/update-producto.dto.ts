import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { MinLength } from '@nestjs/class-validator';
import { IsString, IsPositive, IsNumber } from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
  
}



