import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { HospitalsModule } from 'src/hospitals/hospitals.module';
import { UserModule } from 'src/user/user.module';
import { DoctorsModule } from 'src/doctors/doctors.module';

@Module({
  providers: [SearchService],
  controllers: [SearchController],
  imports:[HospitalsModule, UserModule, DoctorsModule]
})
export class SearchModule {}
