import { Controller, Get, Query, ValidationPipe, Post, Body, UsePipes, Res, HttpStatus, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { PaginationDto } from 'src/dto/pagination.dto';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { Response } from 'express';
import { Hospital } from './interfaces/hospital.interface';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/interfaces/user.interface';

@Controller('hospitals')
export class HospitalsController {
    constructor(private hospitalsService:HospitalsService) { }

    @Get()
    
    async getHospitals(@Query(ValidationPipe) paginationDto:PaginationDto): Promise<{hospitals:Hospital[], counter:number}> { 
         return await this.hospitalsService.getHospitals(paginationDto);
    };

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ValidationPipe)
    async createHospital(
        @GetUser() user: User,
        @Body() createHospitalDto:CreateHospitalDto, 
        @Res() res: Response): Promise<Response> {

        const hospital = await this.hospitalsService.createHospital(createHospitalDto, user);
        return res.status(HttpStatus.CREATED).json({ok:true, message: 'Hospital successfully create', hospital});
    };

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateHospital(
        @Param('id') id:string,
        @Body(ValidationPipe) updateHospitalDto:UpdateHospitalDto,
        @Res() res:Response
        ):  Promise<Response> {

        const hospital = await this.hospitalsService.updateHospital(id,updateHospitalDto);
        return res.status(HttpStatus.OK).json({ok:true, message: 'Hospital successfully updated', hospital});
    };

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    async deleteHospital(@Param('id') id:string, @Res() res:Response): Promise<Response> {
        const hospital = await this.hospitalsService.deleteHospital(id);
        return res.status(HttpStatus.OK).json({ok:true, message: 'Hospital successfully deleted', hospital});
    };

}
