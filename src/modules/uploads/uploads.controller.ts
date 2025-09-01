import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeaders, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UploadsService } from './providers/uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}
  @ApiOperation({ summary: 'Upload file' })
  @ApiHeaders([
    {
      name: 'Content-Type',
      description: 'multipart/form-data',
    },
  ])
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-file')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadsService.uploadFile(file);
  }

  @ApiOperation({ summary: 'Delete file' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Delete('delete-file/:id')
  async deleteFile(@Param('id', ParseIntPipe) id: number) {
    return await this.uploadsService.deleteFile(id);
  }
}
