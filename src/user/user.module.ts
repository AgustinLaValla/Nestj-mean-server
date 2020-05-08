/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[
    MongooseModule.forFeatureAsync(
      [{
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;
          schema.plugin(require('mongoose-unique-validator'), {message: '{PATH} should be unique'});
          return schema
        }
      }]
    )
  ],
  exports:[MongooseModule]
})
export class UserModule {}
