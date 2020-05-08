import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Hospital } from 'src/hospitals/interfaces/hospital.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from 'src/doctors/interfaces/doctor.interface';
import { User } from 'src/user/interfaces/user.interface';
import { SingleQueryDto, validCollctions } from './dto/singleQuery.dto';


@Injectable()
export class SearchService {
    constructor(
        @InjectModel('Hospital') private hospitalModel: Model<Hospital>,
        @InjectModel('Doctor') private doctorModel: Model<Doctor>,
        @InjectModel('User') private userModel: Model<User>

    ) { }

    globalSearch(search: string) {

        const regexp = new RegExp(search, 'i');
        return Promise.all([
            this.searchHospital(regexp),
            this.searchDoctor(regexp),
            this.searchUser(regexp)
        ]);
    };

    async searchHospital(regexp: RegExp): Promise<Hospital[]> {
        return await this.hospitalModel.find({ name: regexp });
    };
    async searchDoctor(regexp: RegExp): Promise<Doctor[]> {
        return await this.doctorModel.find({ name: regexp }).populate('hospital', 'nombre');
    };
    async searchUser(regexp: RegExp): Promise<User[]> {
        return await this.userModel.find({}).or([{ 'username': regexp }, { 'email': regexp }]).exec();
    };

    getResultFromCollection(singleQuerydto: SingleQueryDto): Promise<Hospital[] | Doctor[] | User[]> {
        const { search, collection } = singleQuerydto;
        const regexp = new RegExp(search, 'i');

        let promise: Promise<Hospital[] | Doctor[] | User[]>;

        switch (collection) {
            case validCollctions.hospitals:
                promise = this.searchHospital(regexp);
                break;
            case validCollctions.doctors:
                promise = this.searchDoctor(regexp);
                break;
            case validCollctions.users:
                promise = this.searchUser(regexp);
                break;

            default: throw new BadRequestException(`Your query should matches with: 'hospital, 'doctors', 'users'`);
        };

        return promise

    };

};
