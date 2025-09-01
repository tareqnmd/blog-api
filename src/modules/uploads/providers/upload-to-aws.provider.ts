import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UploadToAwsProvider {
  constructor(private readonly configService: ConfigService) {}

  private generateFileName(file: Express.Multer.File) {
    const fileName = file.originalname.split('.')[0];
    fileName.replace(/\s/g, '').trim();
    const extension = path.extname(file.originalname);
    const timestamp = new Date().getTime().toString().trim();
    return `${fileName}-${timestamp}-${uuid4()}${extension}`;
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const s3 = new S3();
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('appConfig.awsBucketName') ?? '',
          Key: this.generateFileName(file),
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      return uploadResult.Key;
    } catch (e) {
      throw new RequestTimeoutException(e);
    }
  }
}
