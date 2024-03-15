import { Transaccion } from "src/transacciones/entities/transaccion.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import * as moment from 'moment-timezone';



moment.tz.setDefault('America/Argentina/Buenos_Aires');



@Entity({ name:'producto'})
export class Producto {
    
  
    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @CreateDateColumn({ type: 'timestamp' })
    ingreso: Date = moment().toDate();
    
    //////////////////////////////////////
    @Column({ unique: true })
    nombre: string;
    
    
    @Column('int',{
        default:0
    })
    stock:number;
    
    
    @Column('boolean',{
        default:false
        })
    estado:boolean;
    
    
    @OneToMany(() => Transaccion, transaccion => transaccion.producto)
    transacciones: Transaccion[]; // Nombre de la relación inversa

  
}
