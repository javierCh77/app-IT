import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from './productos/productos.module';
import { CommonModule } from './common/dtos/common.module';
import { TransaccionesModule } from './transacciones/transacciones.module';
import { AuthModule } from './auth/auth.module';


//modulos a importar que se van a usar

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities:true,
      //la sincronizacion solamente para desarrollo producion no.
      synchronize:true,      
    }),
    ProductosModule,
    CommonModule,
    TransaccionesModule,
    AuthModule,
    
 
   
  ],
})
export class AppModule {}