import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Hospital } from './interfaces/hospital.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class HospitalsService {
    constructor(@InjectModel('Hospital') private hospitalModel:Model<Hospital>) { }

    async getHospitals(paginationDto:PaginationDto):Promise<{hospitals:Hospital[], counter:number}> { 
        const skip = paginationDto.skip || 0;
        const paginate = paginationDto.paginate || 5;

        const hospitals = await this.hospitalModel.find().skip(skip).limit(paginate).populate('user', 'username email').exec();
        const counter = await this.hospitalModel.estimatedDocumentCount();
        return { hospitals, counter }
    };

    async getHospitalById(id:string): Promise<Hospital> {
        const hospital = await this.hospitalModel.findById(id);
        if(!hospital) throw new NotFoundException(`Hospital not found`);
        return hospital;
    };

    async createHospital(createHospital:CreateHospitalDto, user:User): Promise<Hospital> { 
        const hospital = await this.hospitalModel.create({...createHospital, user: user._id});
        await hospital.save();
        return hospital;
    };

    async updateHospital(id:string ,updateHospitalDto: UpdateHospitalDto): Promise<Hospital> { 
        await this.getHospitalById(id);
        const hospital = await this.hospitalModel.findByIdAndUpdate(id, updateHospitalDto);
        return hospital;
    };

    async deleteHospital(id:string) { 
        await this.getHospitalById(id);
        return await this.hospitalModel.findByIdAndDelete(id);
    };

}
