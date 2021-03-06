import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URI } from './config/db.config';
import { DoctorsModule } from './doctors/doctors.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { LoginModule } from './login/login.module';
import { SearchModule } from './search/search.module';
import { UploadModule } from './upload/upload.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(DB_URI, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true}),
    DoctorsModule,
    HospitalsModule,
    LoginModule,
    SearchModule,
    UploadModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
