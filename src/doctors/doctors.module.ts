import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorSchema } from './schemas/doctor.schema';
import { LoginModule } from 'src/login/login.module';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Doctor', schema: DoctorSchema }
    ]),
    LoginModule
  ],
  exports: [MongooseModule]
})
export class DoctorsModule { }
