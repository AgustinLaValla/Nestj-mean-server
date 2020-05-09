import { Controller, Get, Param, Res } from '@nestjs/common';
import { ImagesService } from './images.service';
import { GetImageDto } from './dto/get-image.dto';
import { Response } from 'express';

@Controller('images')
export class ImagesController {
    constructor(private imagesService:ImagesService) { }

    @Get('/:collectionType/:imageId')
    getImages(@Param() getImageDto:GetImageDto, @Res() res:Response) { 
        const resp = this.imagesService.getImage(getImageDto);
        if(resp.exist) return res.sendFile(resp.imagePath);
        else return res.sendFile(resp.noImagePath);
    };
};
