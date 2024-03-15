import { IsIn, IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";
import { Producto } from "src/productos/entities/producto.entity";

export class CreateTransaccionDto {

   
   
   
    
    @IsNumber()
    @IsPositive()
    cantidad: number;
    
    @IsNotEmpty()
    tipo:string;
    
    @IsString()
    @MinLength(1)
    linea:string;
    
    
    
    
}
