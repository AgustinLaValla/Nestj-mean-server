import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHospitalDto { 
    @IsNotEmpty()
    @IsString()
    name:string;
};