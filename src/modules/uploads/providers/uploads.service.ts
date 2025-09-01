import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileTypes } from '../enums/file-types.enum';
import { UploadFile } from '../interfaces/upload-file.interface';
import { Upload } from '../upload.entity';
import { UploadToAwsProvider } from './upload-to-aws.provider';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
    private readonly configService: ConfigService,
    private readonly uploadToAwsProvider: UploadToAwsProvider,
  ) {}
  async uploadFile(file: Express.Multer.File) {
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }
    const path = await this.uploadToAwsProvider.uploadFile(file);

    const upload: UploadFile = {
      name: file.originalname,
      path: `https://${this.configService.get('appConfig.awsCloudfrontUrl')}/${path}`,
      type: FileTypes.IMAGE,
      mime: file.mimetype,
      size: file.size,
    };
    return await this.uploadRepository.save(upload);
  }
}
