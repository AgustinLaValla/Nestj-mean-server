import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/user/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { Hospital } from 'src/hospitals/interfaces/hospital.interface';
import { Doctor } from 'src/doctors/interfaces/doctor.interface';

@Injectable()
export class UploadService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        @InjectModel('Hospital') private hospitalModel: Model<Hospital>,
        @InjectModel('Doctor') private doctorModel: Model<Doctor>
    ) { }

    async handleQueryAndUpdateImage(collection: string, id: string, filename: string) {
        if (collection !== 'users' && collection !== 'hospitals' && collection !== 'doctors') {
            throw new BadRequestException(`Collection: ${collection} does not exists`);
        };

        switch (collection) {
            case 'users':
                return await this.imageHandler(this.userModel, collection, id, filename);
                break;
            case 'hospitals':
                return await this.imageHandler(this.hospitalModel, collection, id, filename);
                break;
            case 'doctors':
                return await this.imageHandler(this.doctorModel, collection, id, filename);
                break;
        };

    };

    async imageHandler(model: Model<User | Hospital | Doctor>, collection: string, id: string, filename: string): Promise<User | Hospital | Doctor> {
        const schemaDoc: User | Hospital | Doctor = await model.findById(id);
        if (!schemaDoc) throw new NotFoundException(`Requested document not found`);

        const oldPath = schemaDoc.img ? `${path.resolve(__dirname, '..', '..', 'uploads', `${collection}`, schemaDoc.img)}` : null;

        if (oldPath && fs.existsSync(oldPath)) { //If there is an image in this path 
            fs.unlinkSync(oldPath); //It will be deleted
        };

        schemaDoc.img = filename;

        const schemaDocUpdated = await model.findByIdAndUpdate(id, schemaDoc, { new: true });
        return schemaDocUpdated;
    };

};
