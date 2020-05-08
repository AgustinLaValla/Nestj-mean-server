import { IsOptional, IsNumber } from 'class-validator';

export class PaginationDto { 
    @IsOptional()
    @IsNumber()
    skip:number;

    @IsOptional()
    @IsNumber()
    paginate:number
}