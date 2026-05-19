import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateEmpresaDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    representante: string; 
    @IsUUID()
    @IsNotEmpty()
    userId: string;
}
