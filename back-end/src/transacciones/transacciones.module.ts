import { Module } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { TransaccionesController } from './transacciones.controller';
import { Transaccion } from './entities/transaccion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/producto.entity';

@Module({
  controllers: [TransaccionesController],
  providers: [TransaccionesService],
  imports:[
    TypeOrmModule.forFeature([Transaccion, Producto])
  ]
})
export class TransaccionesModule {}
