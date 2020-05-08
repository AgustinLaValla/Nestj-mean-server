import { Controller, Get, Param, Res, ValidationPipe } from '@nestjs/common';
import { SearchService } from './search.service';
import { Response } from 'express';
import { isNullOrUndefined } from 'util';
import { SingleQueryDto } from './dto/singleQuery.dto';

@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService) { }

    @Get('/global/:search')
    async globalSearch(@Param('search') search:string, @Res() res:Response): Promise<Response> { 
        if(search == '' || isNullOrUndefined(search)) return;
        const result = await this.searchService.globalSearch(search);
        return res.json({ok:200, hospitales: result[0], doctors: result[1], users:result[2]});
    };

    @Get('/collection/:collection/:search')
    async searchByCollection(@Param(ValidationPipe) singleQueryDto:SingleQueryDto, @Res() res:Response):Promise<Response> { 
        const result = await this.searchService.getResultFromCollection(singleQueryDto);
        return res.json({ok:true, [singleQueryDto.collection]: result});
    };

};
