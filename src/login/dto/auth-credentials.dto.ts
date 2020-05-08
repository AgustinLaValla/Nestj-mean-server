import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthCredentialsDto {
    
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

}