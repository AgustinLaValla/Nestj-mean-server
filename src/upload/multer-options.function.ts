import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const multerOptions = (dest: string): MulterOptions => {
    return {
        storage: diskStorage({
            destination: `uploads/${dest}`,
            filename: (req, file, cb) => {
                return cb(null, uuid() + path.extname(file.originalname).toLowerCase());
            }
        }),
        limits: { fileSize: 1000000 * 10 },  //10 MG Max
        fileFilter: ((req, file, cb) => {
            const filetypes = /jpeg|jpg|png|gif/; //File extension acepted
            const mimetype = filetypes.test(file.mimetype); //if mimetype matches with filetypes values is valid
            const extname = filetypes.test(path.extname(file.originalname)) //To extract the file extension name(mimetype
            if (mimetype && extname) return cb(null, true); //If mimetype matches
            cb(null, false);
        })
    };
};