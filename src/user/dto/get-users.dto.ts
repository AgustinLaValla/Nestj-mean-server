import { IsOptional, IsNumber } from 'class-validator';

export class GetUsersDto { 
    @IsOptional()
    @IsNumber()
    skip:number;

    @IsOptional()
    @IsNumber()
    paginate:number
};