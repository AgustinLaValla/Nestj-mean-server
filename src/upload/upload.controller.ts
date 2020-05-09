import { Controller, Post, UseInterceptors, UploadedFile, Res, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { multerOptions } from './multer-options.function';
import { isNullOrUndefined } from 'util';
import { UploadService } from './upload.service';


@Controller('upload')
export class UploadController {

    constructor(private uploadService: UploadService) { }


    @Post('/hospitals/:id')
    @UseInterceptors(FileInterceptor('file', multerOptions('hospitals')))
    async uploadHospitalFile(
        @UploadedFile() file,
        @Param('id') id: string,
        @Res() res: Response
    ) {
        if (isNullOrUndefined(file)) return res.json({ ok: false, message: 'There is no image' })
        const hospital = await this.uploadService.handleQueryAndUpdateImage('hospitals', id, file.filename)
        return res.json({ ok: true, message: 'Hospital Image Updated', hospital, file });

    };

    @Post('/doctors/:id')
    @UseInterceptors(FileInterceptor('file', multerOptions('doctors')))
    async uploadDoctorsFile(
        @UploadedFile() file,
        @Param('id') id: string,
        @Res() res: Response
    ) {
        if (isNullOrUndefined(file)) return res.json({ ok: false, message: 'There is no image' });
        const doctor = await this.uploadService.handleQueryAndUpdateImage('doctors', id, file.filename);
        return res.json({ ok: true, message: 'Doctor Image Updated', doctor, file })

    };

    @Post('/users/:id')
    @UseInterceptors(FileInterceptor('file', multerOptions('users')))
    async uploadUsersFile(
        @UploadedFile() file,
        @Param('id') id: string,
        @Res() res: Response
    ) {
        if (isNullOrUndefined(file)) return res.json({ ok: false, message: 'There is no image' })
        const user = await this.uploadService.handleQueryAndUpdateImage('users', id, file.filename);
        return res.json({ ok: true, message: 'User Image Updated', user, file })

    };


};

