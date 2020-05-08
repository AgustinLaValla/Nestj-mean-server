import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateDoctorDto {
    @IsNotEmpty()
    @IsString() 
    name:string;

    @IsOptional()
    @IsString()
    img:string;

    @IsNotEmpty()
    @IsString()
    hospital:string
};