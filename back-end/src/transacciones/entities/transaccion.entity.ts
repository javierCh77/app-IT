import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment-timezone';



moment.tz.setDefault('America/Argentina/Buenos_Aires');


@Entity('transacciones')
export class Transaccion {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  

  @ManyToOne(() => Producto, { eager: true }) // eager loading para cargar automáticamente el producto al cargar una transacción
  @JoinColumn()
  producto: Producto;


  @Column({ default: 'salida' })
  tipo: string;

  @Column()
  cantidad: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha?: Date = moment().toDate();
  
  @Column('text')
  linea:string;
  
  
  

}
