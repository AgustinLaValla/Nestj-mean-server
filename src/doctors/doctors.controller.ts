import { Controller, Post, Body, ValidationPipe, UseGuards, Res, HttpStatus, Get, Query, Put, Param, Delete } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/interfaces/user.interface';
import { Response } from 'express';
import { PaginationDto } from 'src/dto/pagination.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctors')
export class DoctorsController {
    constructor(private doctorsService: DoctorsService) { }

    @Get()
    async getDoctors(@Query(ValidationPipe) paginationDto: PaginationDto, @Res() res: Response): Promise<Response> {
        const doctors = await this.doctorsService.getDoctors(paginationDto);
        return res.json({ ok: true, doctors });
    };

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createDoctor(
        @GetUser() user: User,
        @Body(ValidationPipe) createDoctorDto: CreateDoctorDto,
        @Res() res: Response
    ): Promise<Response> {

        const doctor = await this.doctorsService.createDoctor(createDoctorDto, user);
        return res.status(HttpStatus.CREATED).json({ ok: true, message:'Doctor Successfully Created',doctor })
    };

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateDoctor(
        @Param('id') id: string,
        @Body(ValidationPipe) updateDoctorDto: UpdateDoctorDto,
        @Res() res: Response): Promise<Response> {

        const doctor = await this.doctorsService.updateDoctor(id, updateDoctorDto);
        return res.json({ ok: true, message:'Doctor Successfully Updated',doctor });
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    async deleteDoctor(@Param('id') id:string, @Res() res:Response) {
        const doctor = await this.doctorsService.deleteDoctor(id);
        return res.json({ok:true, message: 'Doctor Successfully Deleted', doctor})
     }

};
