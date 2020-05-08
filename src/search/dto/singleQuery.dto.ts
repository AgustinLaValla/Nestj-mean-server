import { IsNotEmpty, IsString, IsIn } from "class-validator";

export enum validCollctions {
    hospitals = 'hospitals',
    doctors = 'doctors',
    users = 'users'
};

export class SingleQueryDto {
    @IsNotEmpty()
    @IsString()
    search: string;


    @IsNotEmpty()
    @IsIn([validCollctions.hospitals, validCollctions.doctors, validCollctions.users])
    collection: validCollctions;
};
