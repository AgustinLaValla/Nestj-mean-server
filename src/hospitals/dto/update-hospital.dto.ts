import { CreateHospitalDto } from "./create-hospital.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateHospitalDto extends CreateHospitalDto { 
    @IsOptional()
    @IsString()
    img:string;
};