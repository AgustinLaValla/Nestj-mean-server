import { Module } from '@nestjs/common';
import { HospitalsController } from './hospitals.controller';
import { HospitalsService } from './hospitals.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalSchema } from './schemas/hospital.schema';
import { LoginModule } from 'src/login/login.module';

@Module({
  controllers: [HospitalsController],
  providers: [HospitalsService],
  imports:[
    MongooseModule.forFeature([
      {name:'Hospital', schema:HospitalSchema}
    ]),
    LoginModule
  ],
  exports: [MongooseModule]
})
export class HospitalsModule {}
