import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateAnimeDto {
    @IsString()
    name: string;

    @IsString()
    year: string;

    @IsString()
    length: string;

    @IsString()
    @IsNotEmpty()
    storyline: string;

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    image: string;
}
