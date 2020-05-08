import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SEED } from 'src/config/seed.config';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';


@Module({
  controllers: [LoginController],
  providers: [LoginService, JwtStrategy, UserService],
  imports:[
    PassportModule.register({defaultStrategy:'jwt', session:false}), //Authorization Strategy
    JwtModule.register({secret:SEED, signOptions:{ expiresIn:3600 * 4 }}),
    UserModule
  ],
  exports:[UserModule, PassportModule, JwtStrategy]
})
export class LoginModule {}
