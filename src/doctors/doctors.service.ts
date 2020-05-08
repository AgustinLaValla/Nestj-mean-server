import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Doctor } from './interfaces/doctor.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { User } from 'src/user/interfaces/user.interface';
import { PaginationDto } from '../dto/pagination.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {

    constructor(@InjectModel('Doctor') private doctorModel: Model<Doctor>) { }

    async getDoctors(pagination:PaginationDto): Promise<Doctor[]>  { 
        const skip = Number(pagination.skip || 0);
        const paginate = Number(pagination.paginate || 5);

        const doctors = await this.doctorModel.find()
                                        .skip(skip)
                                        .limit(paginate)
                                        .populate('hospital', 'name')
                                        .populate('user', 'username email')
                                        .exec();
        return doctors;
    };

    async getDoctorById(id:string) { 
        const doctor = await this.doctorModel.findById(id);
        if(!doctor) throw new NotFoundException(`Doctor Not Found`);
        return doctor;
    }

    async createDoctor(createDoctorDto: CreateDoctorDto, user:User):Promise<Doctor> {
        console.log('User: ', user);
        const doctor = await this.doctorModel.create({...createDoctorDto, user:user._id});
        await doctor.save();
        return doctor;
    };

    async updateDoctor(id:string ,updateDoctorDto:UpdateDoctorDto):Promise<Doctor> { 
        if(Object.keys(updateDoctorDto).length === 0) return;

        await this.getDoctorById(id);

        const doctor = this.doctorModel.findByIdAndUpdate(id, updateDoctorDto, {new:true});
        return doctor;
    };

    async deleteDoctor(id:string):Promise<Doctor> { 
        await this.getDoctorById(id);
        return await this.doctorModel.findByIdAndDelete(id);
    };

};
