import { IsString, IsOptional } from 'class-validator';

export class UpdateDoctorDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    img:string;


    @IsOptional()
    @IsString()
    hospital: string
};