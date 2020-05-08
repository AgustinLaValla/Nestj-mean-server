import { IsString, IsNotEmpty, IsEmail, IsIn } from 'class-validator'
import { UserRole } from '../interfaces/user.role';

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsIn([ UserRole.ADMIN_ROLE, UserRole.USER_ROLE])
    readonly role: UserRole;
}