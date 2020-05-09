import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { GetImageDto } from './dto/get-image.dto';

@Injectable()
export class ImagesService {

    getImage(getImageDto:GetImageDto) {
        const { collectionType, imageId} = getImageDto;

        const imagePath =`${path.resolve(__dirname, '..', '..', 'uploads', collectionType, imageId)}`;
         

        if(fs.existsSync(imagePath)) {
            return {exist:true ,imagePath};
        } else {
            const noImagePath = path.join(__dirname, '..' , 'assets', 'noimage.jpg');
            return {exist:false, noImagePath};
        };
    };
};
