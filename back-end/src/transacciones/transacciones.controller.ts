import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('transacciones')
export class TransaccionesController {
  constructor(private readonly transaccionesService: TransaccionesService) {}

  @Post()
  create(@Body() createTransaccionDto: CreateTransaccionDto) {
    return this.transaccionesService.create(createTransaccionDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.transaccionesService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.transaccionesService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTransaccionDto: UpdateTransaccionDto,
  ) {
    return this.transaccionesService.update(id, updateTransaccionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.transaccionesService.remove(id);
}

/////////////////////////////////////////
@Post(':id/restar-stock')
   restarStock(
     @Param('id', ParseUUIDPipe) id: string,
     @Body() updateTransaccionDto: UpdateTransaccionDto,
   ) {
     updateTransaccionDto.fecha = new Date();
     return this.transaccionesService.restarStock(id, updateTransaccionDto.cantidad,updateTransaccionDto.linea);
   }

}