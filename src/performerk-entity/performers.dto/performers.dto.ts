import { IsNotEmpty, IsString } from "class-validator";


export class PerformersDto {

    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    readonly descripcion: string;

    @IsNotEmpty()
    @IsString()
    readonly imagen: string;
}
