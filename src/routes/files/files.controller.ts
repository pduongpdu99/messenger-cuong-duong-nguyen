// from @nestjs
import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Res,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

// from services
import { FilesService } from './files.service';
import { multerOptions } from './file-filter';
import { Response } from 'express';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) { }

    /**
     * see file uploaded
     * @param path - image path 
     * @param res - response when exec get method
     * @method GET
     * @returns 
     */
    @Get(':filename')
    async seeUploadedFile(@Param('filename') filename: string, @Res() res: Response) {
        return res.sendFile(filename, { root: 'files' });
    }

    /**
     * see file uploaded
     * @param path - image path 
     * @param res - response when exec get method
     * @method DELETE
     * @returns 
     */
    @Delete('simple-upload/:filename')
    async deleteUploadedFile(@Param('filename') filename: string) {
        return await this.filesService.deleteUploadedFile(filename);
    }

    /**
    * see file uploaded
    * @param path - image path 
    * @param res - response when exec get method
    * @method DELETE
    * @returns 
    */
    @Put('simple-upload/:filename')
    @UseInterceptors(AnyFilesInterceptor(multerOptions))
    @ApiConsumes('multipart/form-data')
    async updateUploadedFile(@Param('filename') filename: string, @UploadedFile() file: any) {
        this.deleteUploadedFile(filename);
        // this.uploadedFile(file);

        this.filesService.updateUploadedFile(filename, file);
    }

    @Post('simple-upload')
    @UseInterceptors(AnyFilesInterceptor(multerOptions))
    async uploadedFile(@UploadedFiles() file: Express.Multer.File) {
        return file;
    }

    /**
     * upload multi file 
     * @name multiFileUpload
     * @method GET
     * @param file 
     * @returns 
     */
    @Post('multi-upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    mutliFileUpload(
        @UploadedFiles() files: any[],
        // @Req() _req: Request
    ): Promise<any[]> {
        return this.filesService.multiFileUpload(files);
    }

}