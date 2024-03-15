import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { UpdateTransaccionDto } from './dto/update-transaccion.dto';
import { Transaccion } from './entities/transaccion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class TransaccionesService {
  /////////////////////////////////////////////////////////////
  private readonly logger = new Logger('TransaccionService');

  constructor(
    @InjectRepository(Transaccion)
    private readonly transaccionRepository: Repository<Transaccion>,
    
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

///////////////////////////////////////////////////////////////////////
  async create(createTransaccionDto: CreateTransaccionDto) {
  
    try {
      const transaccion = this.transaccionRepository.create(createTransaccionDto);
      //AQUI DESCOMENTAR PARA LAS IAMGENES
      //images: images.map(image => this.afiliadoImageRepository.create({url:image}))
      await this.transaccionRepository.save(transaccion);
      return transaccion;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
////////////////////////////////////////////////////////////////////////  
async findAll(paginationDto: PaginationDto) {
    const { limit = 500, offset = 0 } = paginationDto;

    const transaccion = await this.transaccionRepository.find({
      take: limit,
      skip: offset,
      // TODO: relaciones aplando relaciones
      // relations:{
      //    images: true,
      // }
    });

    return transaccion.map(({ ...rest }) => ({
      ...rest,
    }));
  }
////////////////////////////////////////////////////////////////////////  
async findOne(term: string) {
  let transaccion: Transaccion;

  if (isUUID(term)) {
    transaccion = await this.transaccionRepository.findOneBy({ id: term });
  } else {
    const queryBuilder = this.transaccionRepository.createQueryBuilder('nombre');
    transaccion = await queryBuilder
      .where('UPPER(nombre) =:nombre', {
        nombre: term.toUpperCase(),
      })
      //.leftJoinAndSelect('prod.images', 'prodImages')
      .getOne();
  }
  if (!transaccion)
    throw new NotFoundException(`Product with ${term} not found`);

  return transaccion;
}
////////////////////////////////////////////////////////////////////////////
async update(id: string, updateTransaccionDto: UpdateTransaccionDto) {
  //PREPARO PARA LA ACTUALIZACION
  const transaccion = await this.transaccionRepository.preload({
    id: id,
    ...updateTransaccionDto,
    //images:[]
  });
  if (!transaccion)
    throw new NotFoundException(`Product with id: ${id} not found`);
  // GUARDO Y SE ACTUALIZA
  try {
    await this.transaccionRepository.save(transaccion);
    return transaccion;
  } catch (error) {
    this.handleDBExceptions(error);
  }
}
//////////////////////////////////////////////////////////////////////////////
  async remove(id: string) {
    const transaccion = await this.findOne(id);
    await this.transaccionRepository.remove(transaccion);
  }
  //////////////////////// PARA MANIPULACION DE ERRORES /////////////////////////
  private handleDBExceptions(error: any) {
    if (error.code == '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Error desconocido chequear en log del servidor',
    );
  }
  ////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////
  
  async restarStock(term: string, stock: number, linea:string): Promise<{ success: boolean; message: string }> {
    const producto = await this.productoRepository.findOneBy({id:term});

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${term} no encontrado`);
    }

    // Crear una nueva transacción al restar stock
    const nuevaTransaccion = this.transaccionRepository.create({
      producto,
      tipo: 'salida',
      cantidad: stock,
      linea: linea,
    });

    // Restar el stock del producto y guardar la nueva transacción
    producto.stock -= stock;

    try {
      await this.productoRepository.save(producto);
      await this.transaccionRepository.save(nuevaTransaccion);
      return { success: true, message: 'Stock restado con éxito' };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  
  
  
}
