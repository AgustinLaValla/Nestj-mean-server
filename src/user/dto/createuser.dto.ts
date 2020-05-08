import { IsString, IsNotEmpty } from 'class-validator';
import { AuthCredentialsDto } from 'src/login/dto/auth-credentials.dto';

export class CreateUserDto extends AuthCredentialsDto {

    @IsString()
    @IsNotEmpty()
    readonly username: string;

};