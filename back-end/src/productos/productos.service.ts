import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { Transaccion } from '../transacciones/entities/transaccion.entity';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class ProductosService {
  //PARA CONVERTIR CAPTURAR EL LOG COMO EN EL LADO DEL SERVIDOR//////
  private readonly logger = new Logger('ProductoService');

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    // @InjectRepository(AfiliadoImage)
    // private readonly afiliadoImageRepository: Repository<AfiliadoImage>,
  ) {}
  ///////////////////CREAR FACTURAS ////////////////////////
  async create(createProductoDto: CreateProductoDto) {
    try {
      const producto = this.productoRepository.create(createProductoDto);
      //AQUI DESCOMENTAR PARA LAS IAMGENES
      //images: images.map(image => this.afiliadoImageRepository.create({url:image}))
      await this.productoRepository.save(producto);
      return producto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
  /////////////PARA BUSCAR TODOS LOS PRODUCTOS ///////////////
  ///////// //Y APLICAR LA PAGINACION POR ESPECIFICIACION/////
  async findAll(paginationDto: PaginationDto) {
    const { limit = 500, offset = 0 } = paginationDto;

    const productos = await this.productoRepository.find({
      take: limit,
      skip: offset,
      // TODO: relaciones aplando relaciones
      // relations:{
      //    images: true,
      // }
    });

    return productos.map(({ ...rest }) => ({
      ...rest,
    }));
  }
  ////////////////// PARA BUSCAR USUARIO POR ID  o slug ///////
  async findOne(term: string) {
    let producto: Producto;

    if (isUUID(term)) {
      producto = await this.productoRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.productoRepository.createQueryBuilder('nombre');
      producto = await queryBuilder
        .where('UPPER(nombre) =:nombre', {
          nombre: term.toUpperCase(),
        })
        //.leftJoinAndSelect('prod.images', 'prodImages')
        .getOne();
    }

    if (!producto)
      throw new NotFoundException(`Product with ${term} not found`);

    return producto;
  }
  /////////////////////// BOORAR PRODUCTO //////////////////////
  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productoRepository.remove(product);
  }
  /////////////////////ACTUALIZAR TODOS LOS PRODUCTOS POR ID//////

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    //PREPARO PARA LA ACTUALIZACION
    const producto = await this.productoRepository.preload({
      id: id,
      ...updateProductoDto,
      //images:[]
    });

    if (!producto)
      throw new NotFoundException(`Product with id: ${id} not found`);
    // GUARDO Y SE ACTUALIZA
    try {
      await this.productoRepository.save(producto);
      return producto;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  ///////////////////ACTUALIZAR Y SUMAR y restar //////////////////////////
  async sumarStock(term: string, stock: number) {
    const producto = await this.productoRepository.findOneBy({ id: term });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${term}} no encontrado`);
    }
    producto.stock += stock;
    producto.ingreso = new Date();
    return this.productoRepository.save(producto);
  }

  ////////////////////////////////////////////////////////////////////////
  async restarStock(term: string, stock: number) {
    const producto = await this.productoRepository.findOneBy({ id: term });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${term} no encontrado`);
    }
    if (producto.stock < stock) {
      throw new BadRequestException(`No hay suficiente stock para restar ${stock}`);
    }

    producto.stock -= stock;
    return this.productoRepository.save(producto);
  }

  //////////////////////// PARA MANIPULACION DE ERRORES /////////////////////////
  private handleDBExceptions(error: any) {
    if (error.code == '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Error desconocido chequear en log del servidor',
    );
  }


}
