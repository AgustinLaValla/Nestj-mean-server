import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalsModule } from 'src/hospitals/hospitals.module';
import { DoctorsModule } from 'src/doctors/doctors.module';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [UserModule, HospitalsModule, DoctorsModule,MongooseModule]
})
export class UploadModule {}
