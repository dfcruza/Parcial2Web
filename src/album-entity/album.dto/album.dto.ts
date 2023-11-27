import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class AlbumDto {
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsDateString()
    readonly fecha_lanzamiento: Date;

    @IsNotEmpty()
    @IsUrl()
    readonly caratula: string;

    @IsNotEmpty()
    @IsString()
    readonly descripcion: string;
}
