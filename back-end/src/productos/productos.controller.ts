import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { NotFoundException } from '@nestjs/common';
import { EntityManager, Transaction } from 'typeorm';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}
  ////////////////////////////////////////////////////////////////////////
  @Post()
  create(@Body() createFacturaDto: CreateProductoDto) {
    return this.productosService.create(createFacturaDto);
  }
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    // console.log(paginationDto)
    return this.productosService.findAll(paginationDto);
  }
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productosService.findOne(term);
  }
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.remove(id);
  }

  // Nuevo controlador para sumar stock
  @Post(':id/sumar-stock')
  sumarStock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    updateProductoDto.ingreso = new Date();
    return this.productosService.sumarStock(id, updateProductoDto.stock);
  }

  //Nuevo controlador para restar stock
  //  @Post(':id/restar-stock')
  //  restarStock(
  //    @Param('id', ParseUUIDPipe) id: string,
  //    @Body() updateProductoDto: UpdateProductoDto,
  //  ) {
  //    updateProductoDto.ingreso = new Date();
  //    return this.productosService.restarStock(id, updateProductoDto.stock);
  //  }
}
