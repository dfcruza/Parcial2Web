import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class TracksDto {
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsNumber()
    readonly duracion: number;
}
