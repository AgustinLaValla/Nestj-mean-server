import { IsNotEmpty, IsIn, IsString } from 'class-validator';
import { collectionValidTypes } from '../interfaces/collection-valid-types.interface';


export class GetImageDto {

    @IsNotEmpty()
    @IsIn([collectionValidTypes.users, collectionValidTypes.hospitals, collectionValidTypes.doctors])
    collectionType: collectionValidTypes;

    @IsNotEmpty()
    @IsString()
    imageId:string

};

