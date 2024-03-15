import { MinLength } from "@nestjs/class-validator";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Matches, IsIn } from "class-validator";



export class CreateProductoDto {

  

    @IsNotEmpty()
    // @Matches(/^[^\s]+$/,{message: 'ntest'})
    @IsString() 
    @MinLength(1)
    nombre:string;
    
    
    @IsNumber()
    @IsPositive()
    stock: number;

   
    ingreso:Date;
    

}
